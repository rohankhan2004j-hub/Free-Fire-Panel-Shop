export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  webViewLink?: string;
  webContentLink?: string;
  modifiedTime?: string;
  iconLink?: string;
}

export const listDriveFiles = async (accessToken: string): Promise<DriveFileItem[]> => {
  const query = encodeURIComponent("trashed = false");
  const fields = encodeURIComponent('files(id,name,mimeType,size,webViewLink,webContentLink,modifiedTime,iconLink)');
  const url = `https://www.googleapis.com/drive/v3/files?q=${query}&fields=${fields}&pageSize=40&orderBy=modifiedTime%20desc`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google Drive API Error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data.files || [];
};

export const uploadFileToDrive = async (
  accessToken: string,
  file: File,
  folderId?: string
): Promise<DriveFileItem> => {
  const metadata = {
    name: file.name,
    mimeType: file.type || 'application/octet-stream',
    parents: folderId ? [folderId] : undefined,
  };

  const form = new FormData();
  form.append(
    'metadata',
    new Blob([JSON.stringify(metadata)], { type: 'application/json' })
  );
  form.append('file', file);

  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,size,webViewLink,webContentLink',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: form,
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Upload Failed: ${err}`);
  }

  const newFile = await response.json();

  // Try making it readable by anyone with the link for panel downloads
  try {
    await fetch(`https://www.googleapis.com/drive/v3/files/${newFile.id}/permissions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        role: 'reader',
        type: 'anyone',
      }),
    });
  } catch {
    // optional permission
  }

  return newFile;
};

export const deleteDriveFile = async (accessToken: string, fileId: string): Promise<void> => {
  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok && response.status !== 204) {
    const err = await response.text();
    throw new Error(`Delete failed: ${err}`);
  }
};
