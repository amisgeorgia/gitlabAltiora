from datetime import datetime

from app.contacts.email_client import EmailMessage, EmailSender
from app.contacts.schemas import ContactCreate, ProspectSubject

QUALIFICATIONS = {
    ProspectSubject.FORMATION: "Demande de formation",
    ProspectSubject.CONSEIL: "Conseil & Stratégie",
    ProspectSubject.BPO: "Externalisation / BPO",
    ProspectSubject.DEVELOPPEMENT: "Solutions Numériques",
    ProspectSubject.AUTRE: "Demande générale",
}


class ContactNotificationService:
    def __init__(self, email_sender: EmailSender, internal_to: str) -> None:
        self._email_sender = email_sender
        self._internal_to = internal_to

    def send_notifications(self, contact: ContactCreate, created_at: datetime | None) -> None:
        qualification = QUALIFICATIONS[contact.subject]
        created_at_text = created_at.isoformat() if created_at else "Date indisponible"
        phone = contact.phone or "Non renseigné"
        full_name = f"{contact.first_name} {contact.last_name}"

        self._email_sender.send(
            EmailMessage(
                to=self._internal_to,
                subject=f"Nouvelle demande : {qualification}",
                text=(
                    "Nouvelle demande de contact\n\n"
                    f"Nom : {full_name}\n"
                    f"E-mail : {contact.email}\n"
                    f"Téléphone : {phone}\n"
                    f"Qualification : {qualification}\n"
                    f"Sujet : {contact.subject.value}\n"
                    f"Message : {contact.message}\n"
                    f"Date : {created_at_text}"
                ),
            )
        )
        self._email_sender.send(
            EmailMessage(
                to=contact.email,
                subject="Votre demande a bien été reçue",
                text=(
                    f"Bonjour {contact.first_name},\n\n"
                    "Nous avons bien reçu votre demande. Notre équipe reviendra vers vous prochainement.\n\n"
                    "ALTIORA PREST"
                ),
            )
        )
