import { IMAGES } from "./images";

//este archivo simula informacion del backend 
// y de la base de datos y será eliminado al implimentar el back

export const STORY_PATH_CONFIG = {
  background: IMAGES.STORY_PATH_BACKGROUND,
  storyButtons: [
    {
      id: 1,
      name: 'Axolotl',
      sourceUnlocked: IMAGES.STORY_BUTTON_AXOLOTL_UNLOCKED,
      sourceLocked: IMAGES.STORY_BUTTON_AXOLOTL_LOCKED,
    },
    {
      id: 2,
      name: 'Bunny',
      sourceUnlocked: IMAGES.STORY_BUTTON_BUNNY_UNLOCKED,
      sourceLocked: IMAGES.STORY_BUTTON_BUNNY_LOCKED,
    },
    {
      id: 3,
      name: 'Cat',
      sourceUnlocked: IMAGES.STORY_BUTTON_CAT_UNLOCKED,
      sourceLocked: IMAGES.STORY_BUTTON_CAT_LOCKED,
    },
    {
      id: 4,
      name: 'Lion',
      sourceUnlocked: IMAGES.STORY_BUTTON_LION_UNLOCKED,
      sourceLocked: IMAGES.STORY_BUTTON_LION_LOCKED,
    },
    {
      id: 5,
      name: 'Panda',
      sourceUnlocked: IMAGES.STORY_BUTTON_PANDA_UNLOCKED,
      sourceLocked: IMAGES.STORY_BUTTON_PANDA_LOCKED,
    },
  ],
};

let userProgress = {
  currentStory: 1, 
};

export const getStoryStatus = (storyId: number) => { 
  return storyId <= userProgress.currentStory; 
};

export const unlockNextStory = () => { 
  const nextStory = userProgress.currentStory + 1; 
  const maxStories = STORY_PATH_CONFIG.storyButtons ? STORY_PATH_CONFIG.storyButtons.length : 0; 
  if (nextStory <= maxStories) { 
    userProgress.currentStory = nextStory; 
    return true;
  }
  return false;
};

export const resetProgress = () => {
  userProgress.currentStory = 1; 
};
