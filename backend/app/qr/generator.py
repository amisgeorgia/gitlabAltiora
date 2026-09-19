import secrets
from io import BytesIO

import qrcode
from qrcode.image.svg import SvgPathImage

CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
CODE_LENGTH = 10


class QrGenerator:
    """Generates non-ambiguous short codes and technical SVG QR codes."""

    def generate_code(self) -> str:
        return "".join(secrets.choice(CODE_ALPHABET) for _ in range(CODE_LENGTH))

    def generate_svg(self, short_url: str) -> str:
        qr_code = qrcode.QRCode(border=4)
        qr_code.add_data(short_url)
        qr_code.make(fit=True)

        image = qr_code.make_image(image_factory=SvgPathImage)
        output = BytesIO()
        image.save(output)
        return output.getvalue().decode("utf-8")
