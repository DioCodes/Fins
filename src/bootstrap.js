import * as Font from "expo-font";
import { Ionicons } from '@expo/vector-icons';

//preload fonts & SVG images
export async function bootstrap() {
  await Font.loadAsync({
    "norms-bold": require("../assets/fonts/TT-Norms-Pro-Bold.otf"),
    "norms-medium": require("../assets/fonts/TT-Norms-Pro-Medium.otf"),
    "norms-regular": require("../assets/fonts/TT-Norms-Pro-Regular.otf"),
    ...Ionicons.font,
  });
}
