import { useEffect, useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  // rewritten the whole script
  const [filteredEvents, setFilteredEvents] = useState([]); 
  const changeType = (newType) => {
    setCurrentPage(1);
    setType(newType);
  };
const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => { 
    const startIndex = (currentPage - 1) * PER_PAGE; 
    const endIndex = startIndex + PER_PAGE; 
    const filtered = type 
      ? data?.events.filter((event) => event.type === type)
      : data?.events || [];
    const paginatedEvents = filtered.slice(startIndex, endIndex); 
    setFilteredEvents(paginatedEvents); 

    const filteredCount = filtered.length;  
    const calculatedPageNumber = Math.ceil(filteredCount / PER_PAGE); 
    setPageNumber(calculatedPageNumber); 
  }, [type, data?.events, currentPage]);

  const typeList = new Set(data?.events.map((event) => event.type));
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {Array.from({ length: pageNumber }, (_, index) => (
              <a href="#nos-realisations"
              // eslint-disable-next-line react/no-array-index-key
                key={index + 1}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => setCurrentPage(index + 1 )}
              >
                {index + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
