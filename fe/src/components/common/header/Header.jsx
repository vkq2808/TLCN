import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IconButton, Cart } from '..';
import { formatNumberWithCommas } from '../../../utils/stringUtils';
import { getCategories } from '../../../redux/actions/categoryActions';
import Following from './following/Following';
import { PRODUCT_ACTION_TYPES, searchProducts } from '../../../redux/actions/productActions';
import { LoadingSpinner } from '..';
const Header = ({ setIsSideBarOpen }) => {

    const auth = useSelector(state => state.auth);
    const categories = useSelector(state => state.category.list);
    const searchResults = useSelector(state => state.product.searchResults);
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryId, setCategoryId] = useState(-1);
    const [escapePressed, setEscapePressed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [displayedProducts, setDisplayedProducts] = useState([]);

    useEffect(() => {
        const renderItemsWithDelay = async () => {
            setDisplayedProducts([]); // Đặt lại danh sách hiển thị
            for (let i = 0; i < searchResults.products.length; i++) {
                await new Promise(resolve => {
                    setTimeout(() => {
                        setDisplayedProducts(prev => [...prev, searchResults.products[i]]);
                        resolve();
                    }, 50); // Thay đổi thời gian nếu cần
                });
            }
        };

        if (searchResults.products.length > 0) {
            renderItemsWithDelay();
        }
    }, [searchResults.products]);

    const handleProfileClick = () => {
        nav('/profile');
    };

    const onSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setEscapePressed(false);
    };

    useEffect(() => {
        if (!categories) {
            dispatch(getCategories());
        }
    }, [categories, dispatch]);

    const onFilterCategoryChange = (e) => {
        setCategoryId(e.target.value);
    };

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            if (searchTerm && searchTerm !== '' && (categoryId || categoryId === -1)) {
                dispatch({ type: PRODUCT_ACTION_TYPES.CLEAR_SEARCH_PRODUCTS });
                dispatch(searchProducts(searchTerm, categoryId, 1, 6));
            } else {
                dispatch({ type: PRODUCT_ACTION_TYPES.CLEAR_SEARCH_PRODUCTS });
            }
            setIsLoading(false);
        }, 300);
    }, [dispatch, searchTerm, categoryId]);



    const handleSearch = (e) => {
        if (searchTerm === '') {
            return;
        }

        if (e.key === 'Escape') {
            setEscapePressed(true);
        }

        if (e.key === 'Enter') {
            const sanitizedSearchTerm = searchTerm.trim().replace(/[\s/]+/g, '-');
            setSearchTerm('');
            nav('/search/q?key=' + sanitizedSearchTerm + '&categoryId=' + categoryId.toString());
        }
    };

    return (
        <div className='flex flex-col w-[100vw] md:w-[80vw] border-none z-10 bg-white md:py-0'>
            <header className="PageHeader flex flex-col md:flex-row justify-between items-center border-b border-b-black">
                <div className="HomeIcon m-[8px] mb-[10px] md:mb-0">
                    <img
                        className="home-icon w-[250px] cursor-pointer"
                        src="https://file.hstatic.net/200000317829/file/logo-02_9e045ad7d96c45e0ade84fd8ff5e8ca2.png"
                        alt="Home"
                        onClick={() => { nav('/'); }}
                    />
                </div>
                <div className="search-bar w-[40%] justify-center items-center hidden lg:!flex flex-row">
                    <select className="border px-2 py-1 w-[100px] "
                        onChange={(e) => onFilterCategoryChange(e)}
                        value={categoryId}
                    >
                        <option value={-1}>Tất cả</option>
                        {categories.map(category => (
                            <option key={category.id}
                                value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <input
                        className="border px-2 py-1 w-full md:w-[70%] lg:w-[80%]"
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={onSearchChange}
                        onKeyDown={(e) => handleSearch(e)}
                        onFocus={() => setEscapePressed(false)}
                    />
                    {searchTerm !== '' && !escapePressed &&
                        <motion.div
                            className="search-result absolute bg-white border border-black w-[500px] top-[78px]"

                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex justify-between">
                                <h6 className="text-center">Kết quả tìm kiếm:</h6>
                                <h6>{searchResults.total} sản phẩm được tìm thấy</h6>
                            </div>
                            {(isLoading &&
                                <LoadingSpinner />) ||
                                displayedProducts.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, x: 30 }} // Bắt đầu từ trạng thái ẩn
                                        animate={{ opacity: 1, x: 0 }}   // Hiện ra với opacity 1
                                        transition={{ duration: 0.2, delay: index * 0.1 }} // Tăng dần delay để tạo hiệu ứng lần lượt
                                        className="search-item p-2 border-b border-black "
                                    >
                                        <div className="flex p-1 m-1 border items-center"
                                            onClick={() => nav('/product/' + product.path)}>
                                            <img
                                                className="w-[70px] h-[70px] cursor-pointer"
                                                src={product.imageUrl}
                                                alt={product.name}
                                            />
                                            <div className="flex flex-col m-2 pr-4 cursor-pointer">
                                                <div>{product.name}</div>
                                                <div className='text-blue-500'>
                                                    {formatNumberWithCommas(product.price)} {product.currency}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            }
                        </motion.div>
                    }
                    <button onClick={handleSearch} className="s-btn block border w-auto py-2">
                        <IconButton iconClassName="fas fa-search"
                            className={"h-auto p-[0px] m-[0px]"} />
                    </button>
                </div>
                <div className="flex flex-row justify-start space-x-4 mt-2 md:mt-0 items-center">
                    {!auth.token && <div className='flex flex-row'>
                        <div className='pl-1 mr-1' onClick={() => nav('/auth/login')}>
                            <span className='underline text-[blue] cursor-pointer'>Đăng nhập</span>
                        </div>
                        /
                        <div className='pl-1 mr-1' onClick={() => nav('/auth/regist')}>
                            <span className='underline text-[blue] cursor-pointer'>Đăng ký</span>
                        </div>
                    </div>}
                    {auth.token && <IconButton iconClassName="fas fa-user" onClick={handleProfileClick} />}
                    <Following />
                    <Cart />
                    <IconButton iconClassName="fas fa-bars" onClick={() => setIsSideBarOpen(true)} />
                </div>
            </header >
            <div className="nav-bar flex flex-row bg-black justify-between 
            items-center pl-8 text-[var(--yellow-color)]">
                <div>Chào mừng đến với UTE Gara</div>
                <div className="flex flex-row justify-center items-center space-x-4">
                    <li className='list-none'>
                        <div className='cursor-pointer p-2 hover:bg-[var(--yellow-color)] hover:text-[black]' onClick={() => nav("/")}>Home</div>
                    </li>
                    <li className='list-none'>
                        <div className='cursor-pointer p-2 hover:bg-[var(--yellow-color)] hover:text-[black]' onClick={() => nav("/products")}>Products</div>
                    </li>
                    <li className='list-none'>
                        <div className='cursor-pointer p-2 hover:bg-[var(--yellow-color)] hover:text-[black]' onClick={() => nav("/about")}>About</div>
                    </li>
                    <li className='list-none'>
                        <div className='cursor-pointer p-2 hover:bg-[var(--yellow-color)] hover:text-[black]' onClick={() => nav("/contact")}>Contact</div>
                    </li>
                </div>
            </div>
        </div >
    );
};

export default Header;
