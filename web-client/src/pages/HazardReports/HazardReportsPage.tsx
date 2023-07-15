import { MarkerF } from "@react-google-maps/api";
import { useGetHazardReportsQuery } from "../../services/hazardReportsQuery";
import HazardMap from "./components/HazardMap";
import HazardReportsList from "./components/HazardReportsList";
import HazardDetails from "./components/HazardDetails";
import { useAppSelector } from "../../store/hooks";
import { selectHazardReport } from "../../store/slices/hazardReportSlice";

const HazardReportsPage = () => {
  const selectedReport = useAppSelector(selectHazardReport);
  const {
    data: reportsData,
    isLoading: isReportsLoading,
    isError: isReportsError,
    error,
  } = useGetHazardReportsQuery(undefined);

  if (isReportsLoading) console.log("Loading...");
  if (isReportsError) console.log(error);

  return (
    <div className="relative h-screen">
      <div className="relative z-10 flex flex-col gap-2 w-max items-start">
        <h1>Hazard Reports Page</h1>
        <div className="flex flex-col gap-2 bg-gray-50 p-3 shadow-md rounded-md">
          {isReportsLoading ? (
            <p className="text-center">Loading Reports</p>
          ) : (
            <HazardReportsList reportsData={reportsData || []} />
          )}
        </div>
      </div>
      {selectedReport && <HazardDetails reportData={selectedReport} />}
      <HazardMap>
        {/* Child components, such as markers, info windows, etc. */}
        {!isReportsLoading &&
          reportsData?.map((report) => (
            <MarkerF
              key={report._id}
              position={{
                lat: report.latitude,
                lng: report.longitude,
              }}
            />
          ))}
      </HazardMap>
    </div>
  );
};

export default HazardReportsPage;
