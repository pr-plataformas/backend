export class ReorderSubsectionsDto {
  sectionId: string;
  subsections: { id: string; order: number }[];
}
