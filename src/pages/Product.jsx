import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
import { useState } from "react";
import { createDataFunc, updateDataFunc } from "../redux/dataSlice";
import Button from "../components/Button";
import { modalFunc } from "../redux/modalSlice";
import Input from "../components/Input";
import { useLocation, useNavigate } from "react-router-dom";

const Product = () => {
  const modal = useSelector((state) => state.modal.modal);
  const data = useSelector((state) => state.data.data);
  const keyword = useSelector((state) => state.data.keyword);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    url: "",
    id: "",
  });

  const onChangeFunc = (e, type) => {
    if (type == "url") {
      setProductInfo((prev) => ({
        ...prev,
        [e.target.name]: URL.createObjectURL(e.target.files[0]),
      }));
    } else {
      setProductInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  let loc = location?.search.split("=")[1];
  useEffect(() => {
    if (loc) {
      // Güncelleme için ürün bilgilerini bulup set ediyoruz
      const productToUpdate = data.find((item) => item.id === parseInt(loc));
      if (productToUpdate) {
        setProductInfo(productToUpdate); // Formu güncellenmiş ürünle dolduruyoruz
      }
    } else {
      // Yeni ürün eklerken formun boş olmasını sağlıyoruz
      setProductInfo({
        name: "",
        price: "",
        url: "",
        id: "",
      });
    }
  }, [loc, data]);

  const buttonFunc = () => {
    dispatch(createDataFunc({ ...productInfo, id: data.length + 1 }));
    dispatch(modalFunc());
    navigate("/");
  };

  const buttonUpdateFunc = () => {
    dispatch(updateDataFunc(productInfo));
    dispatch(modalFunc());
    navigate("/");
  };

  const contentModal = (
    <>
      <Input
        value={productInfo.name}
        type={"text"}
        placeholder={"Ürün Ekle"}
        name={"name"}
        id={"name"}
        onChange={(e) => onChangeFunc(e, "name")}
      />
      <Input
        value={productInfo.price}
        type={"text"}
        placeholder={"Fiyat Ekle"}
        name={"price"}
        id={"price"}
        onChange={(e) => onChangeFunc(e, "price")}
      />
      <Input
        type={"file"}
        placeholder={"Resim Seç"}
        name={"url"}
        id={"url"}
        onChange={(e) => onChangeFunc(e, "url")}
      />
      <Button
        btnText={loc ? "Ürün Güncelle" : "Ürün Oluştur"}
        onClick={loc ? buttonUpdateFunc : buttonFunc}
      />
    </>
  );

  // filteredItems, keyword'a göre data'yı filtreler
  const filteredItems = data.filter(
    (item) => item.name.toLowerCase().includes(keyword.toLowerCase()) // keyword'e göre filtreleme
  );

  return (
    <div>
      <div className="flex items-center flex-wrap">
        {filteredItems.length === 0 ? (
          <p className="flex items-center justify-center h-screen w-full font-semibold text-2xl">
            Ürün bulunamadı...
          </p> // Eğer hiçbir ürün bulunmazsa bir mesaj göster
        ) : (
          filteredItems.map((item) => <ProductCard key={item.id} item={item} />)
        )}
      </div>

      {modal && (
        <Modal
          content={contentModal}
          title={loc ? "Ürün Güncelle" : "Ürün Oluştur"}
        />
      )}
    </div>
  );
};

export default Product;
