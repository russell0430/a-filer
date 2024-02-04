import { Media, MediaDataType, Profile } from "api"

declare namespace API {
  type Meida = Media
  type Audio = MediaDataType["audio"]
  type Video = MediaDataType["video"]
  type Image = MediaDataType["image"]
  type Markdown = MediaDataType["markdown"]

  type User = Profile
}
