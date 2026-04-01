import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios'
import '../axios'
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [books, setBooks] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [isLoading, setIsLoading] = useState('');
    const [error, setError] = useState("");
    const registerUser = async ({ username, email, password }) => {
        try {
            const { data } = await axios.post
                (`/auth/register`,
                    {
                        username: username, email: email, password: password
                    })
            console.log("the data we getting after register is", data);
            // localStorage.setItem(
            //     'user',
            //     JSON.stringify({ name: data.user.username, token: data.token, role: data.user.role })
            // )
            return data;
        } catch (error) {
            const msg = error?.response?.data?.msg || "Invalid Credentials";
            setError(msg);
        }
    }
    const login = async ({ email, password }) => {
        try {
            const { data } = await axios.post(`/auth/login`, {
                email: email, password: password
            })
            console.log("the data we getting after login is", data);
            localStorage.setItem(
                'user',
                JSON.stringify({ name: data.user.username, token: data.token, role: data.user.role })
            )
            setCurrentUser(data.user.username)
        } catch (error) {
            const msg = error?.response?.data?.message || "Invalid email or password";
            setError(msg)
        }
    }
    const logout = () => {
        try {
            localStorage.removeItem('user')
        } catch (error) {
            setError(error)
        }
    }
    const getAllBooks = async () => {
        try {
            const { data } = await axios.get("/books/");
            console.log("the book data is this", data);
            setBooks(data.books);
        } catch (error) {
            const msg = error?.response?.data?.msg || "Failed to fetch books";
            setError(msg);
        }
    }
    const getCartItems = async () => {
        try {
            const { data } = await axios.get("/cart");
            console.log("the we get from the getcartitems is", data);
            const formattedCart = data.cartItems.map(item => ({
                cartItemId: item._id,
                ...item.book
            }));
            console.log("the formatted cart is", formattedCart);
            setCartItems(formattedCart);
        } catch (error) {
            const msg = error?.response?.data?.msg || "Failed to fetch cart";
            console.log("the msg is", msg);
            setError(msg);
        }
    }
    const removeFromCart = async (bookId) => {
        try {
            const { data } = await axios.delete(`/cart/${bookId}`);
            console.log("the data we get from the remove cart is ", data);
            const formattedCart = data.cart_arr.map(item => ({
                cartItemId: item._id,
                ...item.book
            }));
            console.log("the formatted cart is", formattedCart);
            setCartItems(formattedCart);
        } catch (error) {
            const msg = error?.response?.data?.msg || "Failed to remove item";
            setError(msg);
        }
    }
    const addToCart = async (bookId) => {
        try {
            const { data } = await axios.post(`/cart/${bookId}`);
            console.log("the data we get from add to cart is", data);
            const formattedCart = data.cart_arr.map(item => ({
                cartItemId: item._id,
                ...item.book
            }));
            console.log("the formatted cart is", formattedCart);
            setCartItems(formattedCart);
            //setCartItems(data.cart);
        } catch (error) {
            const msg = error?.response?.data?.msg || "Failed to add to cart";
            setError(msg);
        }
    }
    const clearCart = async () => {
        try {
            await axios.delete("/cart");
            setCartItems([]);
        } catch (error) {
            const msg = error?.response?.data?.msg || "Failed to clear cart";
            setError(msg);
        }
    }
    const getOrders = async () => {
        try {
            const { data } = await axios.get("/orders");
            console.log("the data we get from get orders is", data);
            setOrderItems(data);
        } catch (error) {
            const msg = error?.response?.data?.msg || "Failed to fetch orders";
            setError(msg);
        }
       
    }
     const createOrder = async (orderData) => {
            try {
                const { data } = await axios.post("/orders", orderData);
                console.log("the data we get from create order is", data);
                //setOrderItems(prevOrders => [...prevOrders, data.order]);
            } catch (error) {
                const msg = error?.response?.data?.msg || "Failed to create order";
                setError(msg);
            }
        }
    useEffect(() => {
        const user = localStorage.getItem('user')
        console.log("the user in useeffect is", user)
        getCartItems();
        if (user) {
            const newUser = JSON.parse(user)
            setCurrentUser(newUser.name)
        }
    }, [])
    return (
        <AuthContext.Provider
            value=
            {
                {
                    currentUser,
                    cartItems,
                    orderItems,
                    books,
                    registerUser,
                    login,
                    getAllBooks,
                    getCartItems,
                    removeFromCart,
                    addToCart,
                    clearCart,
                    getOrders,
                    createOrder,
                    logout,
                    error,
                }
            }>
            {children}
        </AuthContext.Provider>
    )
}
const useAuthContext = () => {
    return useContext(AuthContext);
};
export { AuthProvider, useAuthContext }