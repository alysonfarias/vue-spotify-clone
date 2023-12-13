
<script setup lang="ts">
import { onMounted, ref, toRefs} from 'vue';
import { RouterLink } from 'vue-router';
import Play from 'vue-material-design-icons/Play.vue';
import Pause from 'vue-material-design-icons/Pause.vue';
import Heart from 'vue-material-design-icons/Heart.vue';


let isHover = ref(false);
let isTrackTime = ref(null);

onMounted(() => {
   const audio = new Audio(track?.value.path);
   audio.addEventListener('loadedmetadata', () => {
       const duration = audio.duration;
       const minutes = Math.floor(duration / 60);
       const seconds = Math.floor(duration % 60);
       isTrackTime.value = minutes+":"+seconds.toString().padStart(2, '0');
   })
})
const props = defineProps({
    track: Object,
    artist: Object,
    index: Number,
});

const { track, artist, index } = toRefs(props);
</script>
<template>
    <li class="flex items-center justify-between rounded-md hover:bg-[#2A2929]"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
    >
        <div class="flex items-center w-full py-1 5">
            <div v-if="isHover" class="w-[40px] ml-[14px] mr-[6px] cursor-pointer">
                <Play v-if="true" fillColor="#FFFFFF" :size="25"></Play>
                <Play v-else fillColor="#FFFFFF" :size="25"></Play>
            </div>
            <div v-else class="text-white font-semilbold w-[40px] ml-5">
                <span class="text-gray-400">{{ index }}</span>
            </div>
            <div>
                <div class="text-white font-semibold">
                    {{ track.name }}
                </div>
                <div class="text-sm font-semilbold text-gray-400">{{ artist.name }}</div>
            </div>
        </div>
        <div class="flex items-center">
            <button type="button" v-if="isHover">
                <Heart fillColor="#1BD760" :size="22" />
            </button>
            <div 
            v-if="isTrackTime"
             class="text-xs mx-5 text-gray-400"
            >
                {{ isTrackTime }}
            </div>
        </div>
    </li>
</template>

