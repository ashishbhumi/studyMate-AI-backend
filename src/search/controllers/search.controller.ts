import { Controller, Get, Query, UseGuards, Request } from "@nestjs/common";
import { SearchService } from "../services/search.service";
import { SearchDto } from "../dto/search.dto";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";

@Controller("search")
@UseGuards(JwtAuthGuard)
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get()
  async search(
    @Request() req,
    @Query() searchDto: SearchDto,
  ) {
    return this.searchService.searchNotes(req.user.sub, searchDto);
  }
}
