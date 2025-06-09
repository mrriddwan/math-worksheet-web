import { query, collection, orderBy, limit, getDocs } from "firebase/firestore";
import { useState } from "react";
import { firestoreDB } from "../../firebaseConfig";

export const useLeaderBoard = () => {
  const [topPlayers, setTopPlayers] = useState<
    { id: string; player: string; score: number }[]
  >([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);

  const fetchLeaderboards = async () => {
    try {
      setLoadingLeaderboard(true);

      const q = query(
        collection(firestoreDB, "leaderboard"),
        orderBy("score", "desc"),
        limit(3)
      );

      const querySnapshot = await getDocs(q);
      const leaderboardData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          player: data.player ?? "",
          score: data.score ?? 0,
        };
      });

      setTopPlayers(leaderboardData);
      console.log("Top 3 players:", leaderboardData);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      setTopPlayers([]);
    } finally {
      setLoadingLeaderboard(false);
    }
  };
  return {
    topPlayers,
    loadingLeaderboard,
    fetchLeaderboards,
  };
};
