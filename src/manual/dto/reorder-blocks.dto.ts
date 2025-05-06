export class ReorderBlocksDto {
  subsectionId: string;
  blocks: { id: string; order: number }[];
}
