import React, { useState, useEffect, useMemo } from "react";
import { View, ImageBackground, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { BackButton } from "@/components/BackButton";
import {StoryButton} from "@/components/StoryPath";
import {
  STORY_PATH_CONFIG,
  getStoryStatus,
  unlockNextStory,
} from "@/constants/storyPathConfig";

const backgroundImageSource = Image.resolveAssetSource(
  STORY_PATH_CONFIG.background,
);
const originalBackgroundImageWidth = backgroundImageSource.width;
const originalBackgroundImageHeight = backgroundImageSource.height;

const storyButtonPositions = [
  { x: 0.59, y: 0.82, scale: 0.47 }, // StoryButton 1
  { x: 0.45, y: 0.61, scale: 0.38 }, // StoryButton 2
  { x: 0.51, y: 0.43, scale: 0.33 }, // StoryButton 3
  { x: 0.48, y: 0.26, scale: 0.3 }, // StoryButton 4
  { x: 0.55, y: 0.1, scale: 0.25 }, // StoryButton 5
];

interface Layout {
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
  const [containerLayout, setContainerLayout] = useState<Layout | null>(null);

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
    <View className="flex-1">
      <View className="flex-1">
        <ImageBackground
          source={STORY_PATH_CONFIG.background}
          className="flex-1 w-full"
          resizeMode="cover"
        >
          <SafeAreaView edges={["top"]} className="bg-transparent">
            <View className="mt-4 ml-5 self-start">
              <BackButton onPress={() => router.back()} />
            </View>
          </SafeAreaView>

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
    </View>
  );
};

export default StoryPath;
