import type { AppState } from '../types/domain'
import { dateKey, daysAgo, uid } from '../lib/date'

export function createSeedState(): AppState {
  const iso = (days: number) => {
    const date = daysAgo(days)
    date.setHours(20, 0, 0, 0)
    return date.toISOString()
  }
  return {
    v: 1,
    sample: true,
    mode: 'patient',
    settings: {
      name: 'Asha',
      text: 1,
      theme: 'light',
      contrast: false,
      sound: true,
      voice: true,
      simple: false,
      pin: '',
    },
    routine: [
      ['r1', '07:00', 'Wake up and wash your face', 'wake', ''],
      ['r2', '08:00', 'Breakfast', 'meal', ''],
      ['r3', '08:30', 'Morning medicine', 'med', 'With water, after breakfast'],
      ['r4', '10:00', 'Brain game time', 'activity', ''],
      ['r5', '11:00', 'Walk in the garden', 'exercise', '15 minutes with Priya'],
      ['r6', '13:00', 'Lunch', 'meal', ''],
      ['r7', '14:00', 'Afternoon medicine', 'med', ''],
      ['r8', '16:30', 'Video call with Meera', 'family', ''],
      ['r9', '19:30', 'Dinner', 'meal', ''],
      ['r10', '21:00', 'Evening medicine', 'med', ''],
      ['r11', '21:30', 'Bedtime', 'sleep', ''],
    ].map(([id, time, title, type, note]) => {
      return {
        id,
        time,
        title,
        type: type as AppState['routine'][number]['type'],
        note,
      }
    }),
    done: {},
    snooze: {},
    sessions: [],
    moods: [],
    prefs: {},
    observations: [
      {
        id: uid(),
        date: iso(1),
        cat: 'Sleep',
        text: 'Woke up twice in the night and settled after a warm drink.',
        by: 'Priya',
      },
      {
        id: uid(),
        date: iso(3),
        cat: 'Mood',
        text: 'Very cheerful after the video call with Meera.',
        by: 'Rohan',
      },
    ],
    appts: [
      {
        id: uid(),
        date: dateKey(daysAgo(-6)),
        time: '11:00',
        title: 'Memory clinic follow-up',
        with: 'Dr. Anil Mehta',
      },
    ],
    family: [
      {
        id: uid(),
        name: 'Vikram',
        rel: 'Husband',
        desc: 'Loves morning tea and old Hindi songs.',
        av: 0,
        photo: null,
      },
      {
        id: uid(),
        name: 'Rohan',
        rel: 'Son',
        desc: 'Lives with you and makes the best parathas.',
        av: 1,
        photo: null,
      },
      {
        id: uid(),
        name: 'Priya',
        rel: 'Daughter-in-law',
        desc: 'Goes on garden walks with you.',
        av: 2,
        photo: null,
      },
      {
        id: uid(),
        name: 'Meera',
        rel: 'Granddaughter',
        desc: 'Studies in Pune and calls every Saturday.',
        av: 3,
        photo: null,
      },
    ],
    journal: [
      {
        id: uid(),
        title: 'Our wedding day',
        when: '1978',
        text: 'You married Vikram in Jaipur and wore your mother’s red saree.',
        icon: 'flower',
        photo: null,
        audio: null,
      },
      {
        id: uid(),
        title: 'Family trip to Shimla',
        when: '1992',
        text: 'The whole family took the toy train to Shimla.',
        icon: 'train',
        photo: null,
        audio: null,
      },
    ],
    contacts: [
      { id: uid(), name: 'Rohan', rel: 'Son', phone: '+91 98100 12345', primary: true },
      {
        id: uid(),
        name: 'Priya',
        rel: 'Daughter-in-law',
        phone: '+91 98100 67890',
        primary: false,
      },
    ],
    medical: {
      name: 'Asha Sharma',
      dob: '14 March 1952',
      blood: 'B+',
      conditions: "Alzheimer's disease (early stage), high blood pressure",
      allergies: 'Penicillin',
      meds: 'Tablets as prescribed by the doctor.',
      lives: 'With son Rohan and daughter-in-law Priya',
      showId: true,
    },
    sharing: {
      who: 'Dr. Anil Mehta',
      activity: true,
      mood: true,
      notes: true,
      routine: false,
      log: [],
    },
  }
}
