import { Controller } from "@nestjs/common";

@Controller("video")
export class VideoController{
    constructor (private readonly videoService : VideoSerice)
}