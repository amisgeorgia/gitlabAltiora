from enum import Enum


class UserRole(str, Enum):
    ADMIN = "admin"
    EDITOR = "editor"
class ContentType(str, Enum):
    PAGE = "page"
    FORMATION = "formation"
    ACTUALITE = "actualite"
class MessageRole(str, Enum):
    USER = "user"
    ASSISTANT = "assistant"
    SYSTEM = "system"
class ContactStatus(str, Enum):
    NOUVEAU = "nouveau"
    EN_COURS = "en_cours"
    TRAITE = "traite"
    ARCHIVE = "archive"
class QrType(str, Enum):
    URL = "url"
    PAGE = "page"
    SOCIAL = "social"
    VCARD = "vcard"
