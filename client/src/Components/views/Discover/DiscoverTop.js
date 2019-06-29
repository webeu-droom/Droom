import React from "react";
import { Dropdown } from "../../~reusables/atoms/Dropdowns";

export default function DiscoverTop({ jobListings, isCompany, setJoblisting }) {
  return (
    <div>
      <p>Discover</p>
      {jobListings && (
        <Dropdown>
          {jobListings.map((listing, idx) => (
            <option key={idx} value={idx}>
              {listing.position}
            </option>
          ))}
        </Dropdown>
      )}
    </div>
  );
}
