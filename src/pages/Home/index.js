import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SideNav,
  LayoutSidebar,
  Responsive,
  CardProduct,
  Pagination,
  InputText,
} from "upkit";
import BounceLoader from "react-spinners/BounceLoader";

import TopBar from "../../components/TopBar";
import menus from "./menus";
import { config } from "../../config";
import {
  fetchProducts,
  setPage,
  goToNextPage,
  goToPrevPage,
  setKeyword,
  setCategory,
} from "../../features/Products/actions";
import Cart from "../../components/Cart";
import { addItem, removeItem } from "../../features/Cart/actions";
import { useHistory } from "react-router-dom";

export default function Home() {
  let dispatch = useDispatch();
  let products = useSelector((state) => state.products);
  let cart = useSelector((state) => state.cart);

  let history = useHistory();
  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, products.currentPage, products.keyword, products.category]);

  return (
    <div>
      <LayoutSidebar
        sidebar={
          <SideNav
            items={menus}
            verticalAlign="top"
            active={products.category}
            onChange={(category) => dispatch(setCategory(category))}
          />
        }
        content={
          <div className="md:flex md:flex-row-reverse w-full mr-5 h-full min-h-screen">
            <div className="w-full md:w-3/4 pl-5 pb-10 mr-5">
              <TopBar />

              <div className="w-full text-center mb-10 mt-5">
                <InputText
                  fullRound
                  value={products.keyword}
                  placeholder="cari makanan..."
                  fitContainer
                  onChange={(e) => {
                    dispatch(setKeyword(e.target.value));
                  }}
                />
              </div>

              {products.status === "process" && !products.data.length ? (
                <div className="flex justify-center">
                  <BounceLoader color="red" />
                </div>
              ) : null}

              <Responsive desktop={3} items="stretch">
                {products.data.map((product, index) => {
                  return (
                    <div key={index} className="p-2">
                      {product.stock > 0 && (
                        <CardProduct
                          title={product.name}
                          imgUrl={`${config.api_host}/upload/${product.image_url}`}
                          price={product.price}
                          subText={`Satuan: ${product.unit}`}
                          onAddToCart={(_) => dispatch(addItem(product))}
                        />
                      )}
                    </div>
                  );
                })}
              </Responsive>

              <div className="text-center my-10">
                <Pagination
                  totalItems={products.totalItems}
                  page={products.currentPage}
                  perPage={products.perPage}
                  onChange={(page) => dispatch(setPage(page))}
                  onNext={(_) => dispatch(goToNextPage())}
                  onPrev={(_) => dispatch(goToPrevPage())}
                />
              </div>
            </div>

            <div className="w-full md:w-1/4 h-full shadow-lg border-r border-white bg-gray-100">
              <Cart
                items={cart}
                onItemInc={(item) => dispatch(addItem(item))}
                onItemDec={(item) => dispatch(removeItem(item))}
                onCheckout={(_) => history.push("/checkout")}
              />
            </div>
          </div>
        }
        sidebarSize={80}
      />
    </div>
  );
}
