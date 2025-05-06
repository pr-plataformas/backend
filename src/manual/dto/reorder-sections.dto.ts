export class ReorderSectionsDto {
  manualId: string;
  sections: { id: string; order: number }[];
}
