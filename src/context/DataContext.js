import { useNavigate } from "react-router-dom";
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";
import { format } from "date-fns";
import api from '../api/posts'

const { createContext, useState, useEffect } = require("react");

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const title = "RK Social Media";
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const navigate = useNavigate();
    const { width } = useWindowSize();
    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

    useEffect(() => {
        setPosts(data);
    }, [data])

    useEffect(() => {
        const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()) || post.body.toLowerCase().includes(search.toLowerCase()));
        setSearchResults(filteredPosts.reverse());
    }, [posts, search]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = posts.length ? Number(posts[posts.length - 1].id) + 1 : 1;
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = { id: id.toString(), title: postTitle, datetime, body: postBody }
        try {
            const response = await api.post("/posts", newPost)
            const allPosts = [...posts, response.data];
            setPosts(allPosts);
            setPostTitle('');
            setPostBody('');
            navigate('/');
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else {
                console.log(`Error: ${error.message}`)
            }
        }
    }

    const handleEdit = async (id) => {
        try {
            const datetime = format(new Date(), 'MMMM dd, yyyy pp');
            const updatedPost = { id: id.toString(), title: editTitle, datetime, body: editBody }
            const response = await api.put(`/posts/${id}`, updatedPost);
            setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
            setEditTitle('');
            setEditBody('');
            navigate('/');
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }

    const handleDelete = async (id) => {
        try {
            await api.delete(`/posts/${id}`)
            const postsList = posts.filter(post => post.id !== id);
            setPosts(postsList);
            navigate('/');
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }
    return (
        <DataContext.Provider value={{
            title, width, search, setSearch,
            searchResults, fetchError, isLoading,
            handleSubmit, postTitle, setPostTitle, postBody, setPostBody,
            posts, handleDelete,
            handleEdit, editBody, setEditBody, editTitle, setEditTitle
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext