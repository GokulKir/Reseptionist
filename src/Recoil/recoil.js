import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';


export const VoiceAssist = atom({
  key: 'textState',
  default: '',

})

export const VoiceData = atom({
  key: 'voiceState',
  default: '',
})


export const Selection = atom({
  key: 'selectionState',
  default: [0],
})
