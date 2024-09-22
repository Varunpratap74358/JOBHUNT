import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { USER_API_POINT } from '../utils/constant';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const { user, loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  if (user) {
    return <Navigate to={'/'} />;
  }
  
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  });
  
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const { data } = await axios.post(`${USER_API_POINT}/login`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      toast.success(data.message);
      dispatch(setUser(data.user));
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md border border-gray-300 rounded-md p-6 my-10 bg-white shadow-md"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>

          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Email"
              required
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Password"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 mt-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                  id="r1"
                />
                <Label htmlFor="r1" className="cursor-pointer">
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                  id="r2"
                />
                <Label htmlFor="r2" className="cursor-pointer">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>

          {loading ? (
            <Button className="w-full my-4 flex justify-center items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-blue-600 hover:bg-blue-400"
            >
              Login
            </Button>
          )}

          <span className="text-sm text-center">
            You have no account?{' '}
            <Link to="/signup" className="text-blue-600">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
