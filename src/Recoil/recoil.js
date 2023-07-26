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

export const Question = atom({
  key : 'questionState',
  default : '' ,
})

export const ListUsers = atom({
  key : "listUsers",
  default : []
})

export const PorposeOfVisit = atom({
  key : "listUsers",
  default : ""
})

export const gustId = atom({
  key : "gustId",
  default : ""
})

export const EmployeeData = atom({
  key : "EmployeeData",
  default : ""
})

export const VoicePass = atom({
  key : "VoicePass",
  default : false
})