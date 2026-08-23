import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AiService } from "../services/ai.service";
import { SummarizeDto } from "../dto/summarize.dto";
import { UserIdentity } from "../../common/decorators/user-identity.decorator";

@ApiTags("AI")
@Controller("ai")
export class AiController {
  constructor(private aiService: AiService) {}

  @Post("summarize")
  @ApiOperation({ summary: "Generate AI summary for a note" })
  @ApiResponse({ status: 200, description: "Summary generated successfully" })
  async summarize(
    @UserIdentity() userIdentity: { userId: number },
    @Body() summarizeDto: SummarizeDto,
  ): Promise<{ summary: string }> {
    const summary = await this.aiService.summarizeNote(
      summarizeDto.noteId,
      userIdentity.userId,
    );
    return { summary };
  }
}
