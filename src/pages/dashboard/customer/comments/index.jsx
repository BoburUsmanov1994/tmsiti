import React, {useRef, useState} from 'react';
import Dashboard from "../../../../layouts/dashboard";
import Subheader from "../../../../layouts/dashboard/components/subheader";
import useGetQuery from "@/hooks/api/useGetQuery";
import {KEYS} from "@/constants/key";
import {URLS} from "@/constants/url";
import usePostQuery from "@/hooks/api/usePostQuery";
import {get} from "lodash";
import toast from "react-hot-toast";
import Title from "@/components/title";
import Image from "next/image";
import {last} from "lodash/array";

const Index = () => {
    const [isOpen, setIsOpen] = useState(false)
    const productCategoryRef = useRef(null);
    const companyStirRef = useRef(null);
    const ratingValueRef = useRef(null);
    const commentRef = useRef(null);
    const productIdRef = useRef(null);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);


    const handleClick = (ratingValue) => {
        setRating(ratingValue);

    };

    const {data: orderListCustomer} = useGetQuery({
        key: KEYS.orderListCustomer,
        url: URLS.orderListCustomer
    })

    const {mutate: sendComment, isLoadingComment} = usePostQuery({
        listKeyId: "comment-one",
    });

    const handleSendComment = () => {
        const enteredProductCategory = productCategoryRef.current?.textContent;
        const selectedStars = ratingValueRef.current?.value;
        const enteredComment = commentRef.current?.value;
        const customer = +get(user, "data.id");
        const productId = +productIdRef.current?.textContent;
        const enteredCompanyStir = companyStirRef.current?.textContent

        const commentInfo = {
            product_category: enteredProductCategory,
            ad_id: productId,
            comment: enteredComment,
            rating: selectedStars,
            customer: customer,
            company_stir: enteredCompanyStir
        }


        setComments(commentInfo)

        sendComment({
                url: URLS.sendComment,
                attributes: commentInfo
            },
            {
                onSuccess: () => {
                    toast.success('Siz bergan izoh va baho yetkazib beruvchiga yuborildi', {position: 'top-right'})
                }
            }
        )
    }

    return (
        <Dashboard>
            <Subheader title={'Izohlar'}/>
            <div className="p-7">
                <div>
                    {get(orderListCustomer, "data.results", []).map((item, index) => (
                        <div key={index}>
                            <div className={""}>
                                <button onClick={openModal} className={"text-center"}>
                                    Sharh qoldirish
                                </button>

                                {isOpen &&
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                                        <div className="bg-white p-8 rounded shadow-md w-[700px] h-auto flex flex-col">
                                            <div className={"flex justify-between items-center "}>
                                                <Title>Mahsulotni baholash</Title>

                                                <Image onClick={closeModal} className={"cursor-pointer"} src={"/icons/closeModal.svg"}
                                                       alt={"close"} width={30} height={30}/>

                                            </div>
                                            <p className={"text-lg mb-[15px]"}>Mahsulot borasida o'z izohingizni qoldiring.</p>
                                            <textarea ref={commentRef} rows={10} placeholder={"Izoh qoldirish"}
                                                      className={"border p-3 shadow-lg rounded-[6px] mb-[20px] "}>

                                            </textarea>

                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                {[...Array(5)].map((star, index) => {
                                                    const ratingValue = index + 1;

                                                    return (
                                                        <label key={index} style={{ display: 'inline-block' }}>
                                                            <input
                                                                type="radio"
                                                                name="rating"
                                                                ref={ratingValueRef}
                                                                value={ratingValue}
                                                                onClick={() => handleClick(ratingValue)}
                                                                style={{display: 'none'}}
                                                            />
                                                            <svg
                                                                className="star"
                                                                width="25"
                                                                height="25"
                                                                viewBox="0 0 24 24"
                                                                fill={ratingValue <= (hover || rating) ? "#ffd700" : "#ccc"}
                                                                fill={ratingValue <= (hover || rating) ? "#ffd700" : "#ccc"}
                                                                onMouseEnter={() => setHover(ratingValue)}
                                                                onMouseLeave={() => setHover(0)}
                                                            >
                                                                <polygon points="12,2 15,8 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,8"/>
                                                            </svg>
                                                        </label>
                                                    );
                                                })}
                                            </div>



                                                <div className={"hidden"}>
                                                    <p ref={productCategoryRef}>{get(item, "product_category")}</p>
                                                    <p ref={productIdRef}>{last(get(item, "ad_id"))}</p>
                                                    <p ref={companyStirRef}>{get(item, "company")}</p>
                                                </div>


                                            <button
                                                className={"bg-blue-500 hover:bg-blue-600 active:bg-blue-400 mt-[30px] text-white w-full text-lg py-2 rounded-[6px]"}
                                                onClick={handleSendComment}>Yuborish
                                            </button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Dashboard>
    );
};

export default Index;