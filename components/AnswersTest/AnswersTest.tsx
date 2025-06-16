import { View } from "react-native";
import { AnswerDisplayComponent } from "../AnswerDisplayComponent";

const AnswersTest = () => {
  return (
    <View className="bg-white rounded-[50px] border-4 border-yellow-500">
      <AnswerDisplayComponent
        backgroundColor="rgba(248, 230, 60, 0.17)"
        textColor="#918917"
      />
    </View>
  );
};

export default AnswersTest;
