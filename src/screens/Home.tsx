// Home.tsx
import React, { useEffect } from 'react';
import Tabs from '../components/Tabs';
import PartOne from './PartOne';
import PartTwo from './PartTwo';
import { useAppDispatch } from '../store';
import { fetchStockDataAsync } from '../store/slices/partTwoSlice';
import { useModal } from '../contexts/modal-context/modal-context';
import OnboardingModal from '../components/OnboardingModal';

const Home: React.FC = () => {
  const {showModal} = useModal()
  const tabs = [
    { id: 1, title: 'Part 1', content: <PartOne/> },
    { id: 2, title: 'Part 2', content:  <PartTwo />},
  ];
  const dispatch = useAppDispatch()

  useEffect(()=>{
    const init = async () =>{
      showModal(<OnboardingModal />)
      dispatch(fetchStockDataAsync())
    }
    init()
  }, [])

  return (
    <div className="container mx-auto py-8">
      <Tabs tabs={tabs} />
    </div>
  );
};

export default Home;
