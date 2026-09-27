from app.schemas.brand import BrandBase, BrandResponse
from app.schemas.generator import GeneratorBase, GeneratorResponse
from app.schemas.service import ServiceBase, ServiceResponse
from app.schemas.spare_part import SparePartBase, SparePartResponse
from app.schemas.inquiry import InquiryCreate, InquiryResponse
from app.schemas.rental import RentalRequestCreate, RentalRequestResponse

__all__ = [
    "BrandBase",
    "BrandResponse",
    "GeneratorBase",
    "GeneratorResponse",
    "ServiceBase",
    "ServiceResponse",
    "SparePartBase",
    "SparePartResponse",
    "InquiryCreate",
    "InquiryResponse",
    "RentalRequestCreate",
    "RentalRequestResponse",
]