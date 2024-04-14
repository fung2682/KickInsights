from firebase_functions.firestore_fn import (
  on_document_created,
  on_document_deleted,
  on_document_updated,
  on_document_written,
  Event,
  Change,
  DocumentSnapshot,
)

@on_document_created(document="users/{userId}")
def myfunction(event: Event[DocumentSnapshot]) -> None:
    print(f"Created document: {event.document.id}")