import { Controller, Get, Query, UseGuards, Request } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from "@nestjs/swagger";
import { SearchService } from "../services/search.service";
import { SearchDto } from "../dto/search.dto";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";

@ApiTags("Search")
@Controller("search")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get()
  @ApiOperation({ summary: "Search notes with advanced filters" })
  @ApiQuery({ name: "keyword", required: false, type: String })
  @ApiQuery({ name: "folder", required: false, type: String })
  @ApiQuery({ name: "tag", required: false, type: String })
  @ApiQuery({ name: "pinned", required: false, type: Boolean })
  @ApiQuery({ name: "archived", required: false, type: Boolean })
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: "Search results retrieved successfully",
  })
  async search(@Request() req, @Query() searchDto: SearchDto) {
    return this.searchService.searchNotes(req.user.sub, searchDto);
  }
}
