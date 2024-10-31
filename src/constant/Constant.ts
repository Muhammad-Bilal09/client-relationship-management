import Bowl from "../../public/assets/images/image-placeholder _- Change image here.png";
import Bowl2 from "../../public/assets/images/image.png";
import Bowl3 from "../../public/assets/images/image-placeholder _- Change image here (1).png";
import Bowl4 from "../../public/assets/images/image (1).png";

export const products = [
  { src: Bowl, name: "Ceramic Bowl", price: "$29" },
  { src: Bowl2, name: "Ceramic Bowl", price: "$29" },
  { src: Bowl3, name: "Ceramic Bowl", price: "$29" },
  { src: Bowl4, name: "Ceramic Bowl", price: "$29" },
];

export const documentFormFields = [
  { label: "Title", name: "title", type: "text" },
  { label: "Type", name: "type", type: "text" },
  { label: "Date", name: "date", type: "date" },
  { label: "Description", name: "description", type: "textarea" },
];

export const formFields = [
  { label: "Name", name: "name", type: "text" },
  { label: "Quantity", name: "quantity", type: "number" },
  { label: "Price", name: "price", type: "number", step: "0.01" },
  {
    label: "Purchasing Price",
    name: "purchasingPrice",
    type: "number",
    step: "0.01",
  },
];
