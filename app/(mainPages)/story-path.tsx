import React, { useState, useEffect, useMemo } from "react";
import { View, ImageBackground, Image } from "react-native";
import { StoryButton } from "@/components/StoryPath";
import { NavbarComponent } from "@/components/NavBar";
import {
  STORY_PATH_CONFIG,
  getStoryStatus,
  unlockNextStory,
} from "@/constants/storyPathConfig";
import { SafeAreaView } from "react-native-safe-area-context";

const backgroundImageSource = Image.resolveAssetSource(
  STORY_PATH_CONFIG.background,
);
const originalBackgroundImageWidth = backgroundImageSource.width;
const originalBackgroundImageHeight = backgroundImageSource.height;

const storyButtonPositions = [
  { x: 0.34, y: 0.69, scale: 0.49 }, // StoryButton 1
  { x: 0.33, y: 0.50, scale: 0.37 }, // StoryButton 2
  { x: 0.26, y: 0.35, scale: 0.30 }, // StoryButton 3
  { x: 0.42, y: 0.21, scale: 0.28 }, // StoryButton 4
  { x: 0.46, y: 0.10, scale: 0.22 }, // StoryButton 5
];

interface ScreenLayout {
  width: number;
  height: number;
}

const StoryPath = () => {
  const [stories, setStories] = useState(
    STORY_PATH_CONFIG.storyButtons.map((button) => ({
      ...button,
      isUnlocked: getStoryStatus(button.id),
    })),
  );
  const [containerLayout, setContainerLayout] = useState<ScreenLayout | null>(null);

  const handleStoryButtonPress = (storyId: number) => {
    const story = stories.find((s) => s.id === storyId);
    if (story && story.isUnlocked) {
      if (storyId === stories.filter((s) => s.isUnlocked).length) {
        if (unlockNextStory()) {
          setStories((prevStories) =>
            prevStories.map((s) =>
              s.id === storyId + 1 ? { ...s, isUnlocked: true } : s,
            ),
          );
        }
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-transparent" edges={["bottom"]}>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: 1 }}>
          <ImageBackground
            source={STORY_PATH_CONFIG.background}
            className="flex-1 w-full"
            resizeMode="cover"
          >
            <View
              className="flex-1 relative"
              onLayout={(event) => {
                const { width, height } = event.nativeEvent.layout;
                if (
                  width > 0 &&
                  height > 0 &&
                  (!containerLayout ||
                    containerLayout.width !== width ||
                    containerLayout.height !== height)
                ) {
                  setContainerLayout({ width, height });
                }
              }}
            >
              {containerLayout &&
                stories.map((story, index) => {
                  const storyButtonConfig = storyButtonPositions[index];
                  if (!storyButtonConfig || !story) return null;

                  const containerWidth = containerLayout.width;
                  const containerHeight = containerLayout.height;

                  const backgroundImageAspectRatio =
                    originalBackgroundImageWidth / originalBackgroundImageHeight;
                  const containerAspectRatio = containerWidth / containerHeight;

                  let backgroundImageScaleFactor;
                  let backgroundImageOffsetX = 0;
                  let backgroundImageOffsetY = 0;

                  if (backgroundImageAspectRatio >= containerAspectRatio) {

                    backgroundImageScaleFactor =
                      containerHeight / originalBackgroundImageHeight;
                    const scaledImageWidth =
                      originalBackgroundImageWidth * backgroundImageScaleFactor;
                    backgroundImageOffsetX =
                      (containerWidth - scaledImageWidth) / 2; 
                  } else {

                    backgroundImageScaleFactor =
                      containerWidth / originalBackgroundImageWidth;
                    const scaledImageHeight =
                      originalBackgroundImageHeight * backgroundImageScaleFactor;
                    backgroundImageOffsetY =
                      (containerHeight - scaledImageHeight) / 2; 
                  }
                  const baseStoryButtonSizeRelativeToImage =
                    storyButtonConfig.scale * originalBackgroundImageWidth;
                  const finalStoryButtonSizeOnScreen =
                    baseStoryButtonSizeRelativeToImage *
                    backgroundImageScaleFactor;

                  const absoluteStoryButtonCenterXOnImage =
                    storyButtonConfig.x * originalBackgroundImageWidth;
                  const absoluteStoryButtonCenterYOnImage =
                    storyButtonConfig.y * originalBackgroundImageHeight;

                    const scaledStoryButtonCenterXOnBackgroundImage =
                    absoluteStoryButtonCenterXOnImage *
                    backgroundImageScaleFactor;
                  const scaledStoryButtonCenterYOnBackgroundImage =
                    absoluteStoryButtonCenterYOnImage *
                    backgroundImageScaleFactor;

                  const finalStoryButtonCenterXInContainer =
                    scaledStoryButtonCenterXOnBackgroundImage +
                    backgroundImageOffsetX;
                  const finalStoryButtonCenterYInContainer =
                    scaledStoryButtonCenterYOnBackgroundImage +
                    backgroundImageOffsetY;

                  const storyButtonStyle = {
                    position: "absolute",
                    left: finalStoryButtonCenterXInContainer,
                    top: finalStoryButtonCenterYInContainer,
                    width: finalStoryButtonSizeOnScreen,
                    height: finalStoryButtonSizeOnScreen,
                    transform: [
                      { translateX: -(finalStoryButtonSizeOnScreen / 2) },
                      { translateY: -(finalStoryButtonSizeOnScreen / 2) },
                    ],
                    zIndex: stories.length - 1 - index,
                  };

                  if (!story.sourceUnlocked || !story.sourceLocked) {
                    return null;
                  }

                  return (
                    <StoryButton
                      key={story.id}
                      id={story.id}
                      sourceUnlocked={story.sourceUnlocked}
                      sourceLocked={story.sourceLocked}
                      name={story.name}
                      isUnlocked={story.isUnlocked}
                      onPress={handleStoryButtonPress}
                      style={storyButtonStyle}
                    />
                  );
                })}
            </View>
          </ImageBackground>
        </View>
        <NavbarComponent />
      </View>
    </SafeAreaView>
  );
};

export default StoryPath;
