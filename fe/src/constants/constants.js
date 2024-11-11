import { FaCreditCard, FaMobileAlt, FaMoneyBillWave } from "react-icons/fa";

export const payment_method_codes = {
  MOMO: "momo",
  VN_PAY: "vnpay",
  COD: "cod",
}

export const payment_methods = [
  {
    id: payment_method_codes.MOMO,
    name: "Momo",
    icon: <FaMobileAlt className="w-8 h-8 text-pink-500" />,
    description: "Pay with Momo e-wallet"
  },
  {
    id: payment_method_codes.VN_PAY,
    name: "VNPay",
    icon: <FaCreditCard className="w-8 h-8 text-blue-500" />,
    description: "Pay with VNPay gateway",
    banks: [
      {
        code: "NCB",
        name: "Ngan hang NCB",
        logo: "https://s-vnba-cdn.aicms.vn/vnba-media/23/8/22/ncb_64e48d66c2ccd.jpg"
      },
      {
        code: "ACB",
        name: "Ngan hang ACB",
        logo: "https://rubicmarketing.com/wp-content/uploads/2022/12/y-nghia-logo-acb-1.jpg"
      },
      {
        code: "VCB",
        name: "Ngan hang Vietcombank",
        logo: "https://saca.com.vn/vnt_upload/partner/Vietcombank.jpg"
      },
      {
        code: "VNPAYQR",
        name: "Thanh toan qua VNPAYQR",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1UA-RNBzfbFgVg3sWZWoZoJwkEAc6jy5OtA&s"
      }
    ]
  },
  {
    id: payment_method_codes.COD,
    name: "Cash on Delivery",
    icon: <FaMoneyBillWave className="w-8 h-8 text-green-500" />,
    description: "Pay when you receive"
  }
];