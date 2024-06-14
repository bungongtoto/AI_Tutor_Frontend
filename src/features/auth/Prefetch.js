import {store} from '../../app/store';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { usersApiSlice } from '../users/usersApiSlice';
import {examsApiSlice} from '../exams/examsApiSlice';
import { coursesApiSlice } from '../courses/coursesApiSlice';
import { papersApiSlice } from '../papers/papersApiSlice';

const Prefetch = () => {
    
    useEffect(() => {
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
        store.dispatch(examsApiSlice.util.prefetch('getExams', 'examsList', { force: true }))
        store.dispatch(coursesApiSlice.util.prefetch('getCourses', 'coursesList', { force: true }))
        store.dispatch(papersApiSlice.util.prefetch('getPapers', 'papersList', { force: true }))
    }, [])

    return <Outlet />
}
export default Prefetch