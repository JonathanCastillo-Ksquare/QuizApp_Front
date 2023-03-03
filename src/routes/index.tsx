import { Route, Routes, BrowserRouter } from 'react-router-dom';

import RequireAuth from '../context/RequireAuth';

import LoginView from '../views/LoginView';
import SignInView from '../views/SignInView';
import SettingsView from '../views/SettingsView';
import QuestionsView from '../views/QuestionsView';

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoginView />} />
                <Route path='/signInView' element={<SignInView />} />
                <Route element={<RequireAuth />}>
                    <Route path='/settingsView' element={<SettingsView />} />
                    <Route path='/questionsView' element={<QuestionsView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;


