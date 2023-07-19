import React, { useState, useEffect } from 'react'
import './style.css';
import Top3ListItem from 'src/components/Top3ListItem';
import { CurrentListResponseDto, Top3ListResponseDto } from 'src/interfaces/response';
import { currentBoardListMock, popularWordListMock, top3ListMock } from 'src/mocks';
import BoardListItem from 'src/components/BoardListItem';
import { useNavigate } from 'react-router-dom';
import Pagination from 'src/components/Pagination';
import { usePagination } from 'src/hooks';

//          component          //
// description: 메인 화면 컴포넌트 //
export default function Main() {

  //          function          //
  // description: 페이지 이동을 위한 네비게이트 함수 //
  const navigator = useNavigate();

  //          component          //
  // description: 메인 화면의 상단 //
  const MainTop = () => {
    
    //          state          //
    // description: 인기 게시물 리스트 상태 //
    const [top3List, setTop3List] = useState<Top3ListResponseDto[]>([]);

    //          effect          //
    // description: 첫 시작 시 인기 게시물 데이터 불러오기 //
    useEffect(() => {
      if (!top3List.length) setTop3List(top3ListMock);
    }, []);

    //          render          //
    return (
      <div className='main-top'>
        <div className='main-top-text-container'>
          <div className='main-top-text'>Hoons board에서</div>
          <div className='main-top-text'>다양한 이야기를 나눠보세요.</div>
        </div>
        <div className='main-top-3-container'>
          <div className='main-top-3-text'>주간 TOP 3 게시글</div>
          <div className='main-top-3-list'>
            {top3List.map((item) => (<Top3ListItem item={item} />))}
          </div>
        </div>
      </div>
    )
  }

  //          component         //
  // description : 메인 화면 하단 //
  const MainBottom = () => {

    //      state     //
    // description : 최신 게시물 리스트 상태  // 
    const [currentList, setCurrentList] = useState<CurrentListResponseDto[]>([]);
    // description : 인기게시물 상태
    const [popularList, setPopularList] = useState<string[]>([]);
    // description : 페이지네이션 관련 상태 및 함수 // 
    const { totalPage, currentPage, currentSection, onPageClickHandler, onNextClickHandler, onPreviousClickHandler, changeSection } = usePagination();

    // event handler // 
    // description: 인기 검색어 클릭 이벤트 // 
    const onPopularClickHandler = (word: string) => {
      navigator(`/search/${word}`);
    }

    //        effect        // 
    // description : 첫 시작 시 인기 검색어 리스트 불러오기 //
    useEffect(() => {
      if (!popularList.length) setPopularList(popularWordListMock);
    }, []);

    // description : 현재 섹션이 바뀔 때 마다 페이지 리스트 변경 및 최신 게시물 불러오기 // 
    useEffect(() => {
      changeSection(72);
      if (!currentList.length) setCurrentList(currentBoardListMock);
    }, [currentSection]);


    //          render          //
    return (
      <div className='main-bottom'>
        <div className='main-bottom-text'>최신 게시물</div>
        <div className='main-bottom-container'>
          <div className='main-bottom-board-list'>
            {currentList.map((item) => (<BoardListItem item={item} />))}
          </div>
          <div className='main-bottom-popular-box'>
            <div className='main-bottom-popular-card'>
              <div className='main-bottom-popular-text'>인기 검색어</div>
              <div className='main-bottom-popular-list'>
                {popularList.map((item) => (<span className='popular-chip' onClick={() => onPopularClickHandler(item)}>{item}</span>))}
              </div>
            </div>
          </div>
        </div>
        <Pagination 
          totalPage={totalPage} 
          currentPage={currentPage} 
          onPageClickHandler={onPageClickHandler} 
          onNextClickHandler={onNextClickHandler} 
          onPreviousClickHandler={onPreviousClickHandler} 
        />
      </div>
    )
  }



  //          render          // 
  return (
    <div id='main-wrapper'>
      <MainTop />
      <MainBottom />
    </div>
  )
}
