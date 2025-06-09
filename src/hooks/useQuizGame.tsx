import { useState, useCallback, useMemo } from "react";
import { questionAnswers } from "../constants/questionAnswers";

export const useQuizGame = () => {
  const [player, setPlayer] = useState({
    name: "",
    score: 0,
  });

  const nearestValue = 10;
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [tempName, setTempName] = useState("");
  const [showNameModal, setShowNameModal] = useState(true);

  const alphabetNumbering = useMemo(() => ["a.", "b.", "c.", "d."], []);

  const handleAnswerSelect = useCallback(
    (questionNumber: number, answer: number) => {
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionNumber]: answer,
      }));
    },
    []
  );

  const handleReset = useCallback(() => {
    setPlayer((prev) => ({ ...prev, score: 0 }));
    setSelectedAnswers({});
  }, []);

  const calculateCorrectAnswer = useCallback(
    (number: number, roundTo: number) => {
      return Math.round(number / roundTo) * roundTo;
    },
    []
  );

  const handleSubmit = useCallback(() => {
    let correctCount = 0;
    questionAnswers.forEach((qA) => {
      const correctAnswer = calculateCorrectAnswer(qA.number, nearestValue);
      if (selectedAnswers[qA.number] === correctAnswer) {
        correctCount++;
      }
    });
    setPlayer((prev) => ({ ...prev, score: correctCount }));
  }, [selectedAnswers, nearestValue, calculateCorrectAnswer]);

  const handleNameSubmit = useCallback(() => {
    if (tempName.trim()) {
      setPlayer((prev) => ({ ...prev, name: tempName.trim() }));
      setShowNameModal(false);
    }
  }, [tempName]);

  const handleKeyPress = useCallback(
    (e: any) => {
      if (e.key === "Enter") {
        handleNameSubmit();
      }
    },
    [handleNameSubmit]
  );

  return {
    // State
    player,
    nearestValue,
    selectedAnswers,
    tempName,
    showNameModal,
    alphabetNumbering,
    
    // State setters
    setTempName,
    
    // Methods
    handleAnswerSelect,
    handleReset,
    calculateCorrectAnswer,
    handleSubmit,
    handleNameSubmit,
    handleKeyPress,
  };
};