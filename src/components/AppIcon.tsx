import {
  Appointment02Icon,
  AngryIcon,
  ArrowLeft02Icon,
  ArrowRight02Icon,
  Brain01Icon,
  Calendar03Icon,
  Call02Icon,
  Camera02Icon,
  Cancel01Icon,
  Cards02Icon,
  CircleIcon,
  ConfusedIcon,
  DiceIcon,
  FlowerIcon,
  GeometricShapes01Icon,
  Grid3X3Icon,
  HandshakeIcon,
  HeartIcon,
  Home03Icon,
  Image02Icon,
  Medicine02Icon,
  Message02Icon,
  Moon02Icon,
  NeutralIcon,
  PinIcon,
  PuzzleIcon,
  Sad01Icon,
  Search02Icon,
  ServingFoodIcon,
  ShoppingBasket03Icon,
  SmileIcon,
  SleepingIcon,
  Sorting05Icon,
  SortingOneNineIcon,
  StarIcon,
  Sun03Icon,
  TiredIcon,
  TextIcon,
  Tick02Icon,
  Train01Icon,
  UserGroup03Icon,
  VolumeHighIcon,
  WalkingIcon,
  WorryIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react'
import type { AppIconName } from '../types/domain'

const ICONS: Record<AppIconName, IconSvgElement> = {
  appointment: Appointment02Icon,
  'arrow-left': ArrowLeft02Icon,
  'arrow-right': ArrowRight02Icon,
  basket: ShoppingBasket03Icon,
  brain: Brain01Icon,
  calendar: Calendar03Icon,
  call: Call02Icon,
  camera: Camera02Icon,
  cards: Cards02Icon,
  check: Tick02Icon,
  circle: CircleIcon,
  close: Cancel01Icon,
  dice: DiceIcon,
  family: UserGroup03Icon,
  flower: FlowerIcon,
  games: PuzzleIcon,
  grid: Grid3X3Icon,
  handshake: HandshakeIcon,
  heart: HeartIcon,
  home: Home03Icon,
  image: Image02Icon,
  meal: ServingFoodIcon,
  medicine: Medicine02Icon,
  message: Message02Icon,
  moon: Moon02Icon,
  'mood-anxious': WorryIcon,
  'mood-calm': NeutralIcon,
  'mood-confused': ConfusedIcon,
  'mood-frustrated': AngryIcon,
  'mood-happy': SmileIcon,
  'mood-sad': Sad01Icon,
  'mood-tired': TiredIcon,
  'number-order': SortingOneNineIcon,
  pin: PinIcon,
  search: Search02Icon,
  shapes: GeometricShapes01Icon,
  sleeping: SleepingIcon,
  sort: Sorting05Icon,
  star: StarIcon,
  sun: Sun03Icon,
  text: TextIcon,
  train: Train01Icon,
  volume: VolumeHighIcon,
  walking: WalkingIcon,
}

export function AppIcon({
  name,
  size = 24,
  strokeWidth = 1.8,
  className = '',
}: {
  name: AppIconName
  size?: number | string
  strokeWidth?: number
  className?: string
}) {
  return (
    <HugeiconsIcon
      className={`app-icon app-icon--${name} ${className}`.trim()}
      icon={ICONS[name]}
      size={size}
      strokeWidth={strokeWidth}
      color="currentColor"
      aria-hidden="true"
      focusable="false"
    />
  )
}
