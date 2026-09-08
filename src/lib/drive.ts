/** Convert a Google Drive share ("view") URL into its embeddable
 * "/preview" form, used for the hover-preview iframe. */
export function driveEmbedUrl(viewUrl?: string): string | null {
  if (!viewUrl) return null;
  const match = viewUrl.match(/\/file\/d\/([^/]+)/);
  return match ? `https://drive.google.com/file/d/${match[1]}/preview` : null;
}
