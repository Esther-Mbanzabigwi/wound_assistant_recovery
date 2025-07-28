import { PredictionHandler } from "@/api/prediction";
import AppLayout from "@/components/AppLayout";
import { Colors } from "@/constants/Colors";
import { SharedStyles } from "@/constants/SharedStyles";
import { useAuthContext } from "@/context/authcontext";
import { IPrediction } from "@/types/prediction";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HistoryScreen() {
  const [history, setHistory] = useState<IPrediction[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuthContext();

  const loadHistory = async () => {
    try {
      setLoading(true);
      if (user?.documentId) {
        const predictions = await PredictionHandler.getUserPredictions(
          parseInt(user.documentId)
        );
        setHistory(predictions);
      }
    } catch (error) {
      console.error("Failed to load history:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadHistory();
    setRefreshing(false);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const getPredictionColor = (prediction: string) => {
    switch (prediction.toLowerCase()) {
      case "infected":
        return Colors.light.danger;
      case "healing":
        return Colors.light.success;
      case "normal":
        return Colors.light.primary;
      default:
        return Colors.light.gray[500];
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getImageUrl = (image: any) => {
    if (image?.data?.attributes?.url) {
      return `https://wound-assitant-backend.onrender.com${image.data.attributes.url}`;
    }
    return null;
  };

  const renderItem = ({ item }: { item: IPrediction }) => {
    const imageUrl = getImageUrl(item.image);

    return (
      <TouchableOpacity
        style={[SharedStyles.card, styles.historyCard]}
        onPress={() => {
          router.push({
            pathname: "/history/result",
            params: {
              imageUri: imageUrl || "",
              result: item.prediction,
              confidence: item.predictionConfidence.toString(),
              predictionId: item.id,
            },
          });
        }}
      >
        <View style={styles.cardHeader}>
          {imageUrl && (
            <Image source={{ uri: imageUrl }} style={styles.thumbnail} />
          )}
          <View style={styles.cardInfo}>
            <Text style={styles.classification}>{item.prediction}</Text>
            <Text style={styles.timestamp}>{formatDate(item.documentId)}</Text>
            <View style={styles.urgencyContainer}>
              <View
                style={[
                  styles.urgencyBadge,
                  {
                    backgroundColor: getPredictionColor(item.prediction),
                  },
                ]}
              >
                <Text style={styles.urgencyText}>
                  {(item.predictionConfidence * 100).toFixed(1)}%
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <AppLayout useScrollView={false}>
      <View style={styles.header}>
        <Text style={SharedStyles.title}>Analysis History</Text>
        <Text style={SharedStyles.subtitle}>
          Review your past wound analyses and track healing progress
        </Text>
      </View>

      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              {loading
                ? "Loading your history..."
                : "No wound analyses yet. Take a photo to get started!"}
            </Text>
          </View>
        }
      />
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 16,
  },
  list: {
    padding: 20,
  },
  historyCard: {
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    gap: 16,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  cardInfo: {
    flex: 1,
    gap: 4,
  },
  classification: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.primary,
  },
  timestamp: {
    fontSize: 14,
    color: Colors.light.gray[500],
  },
  urgencyContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  urgencyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  urgencyText: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
  },
  emptyState: {
    padding: 20,
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: Colors.light.gray[500],
    textAlign: "center",
  },
});
