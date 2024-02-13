import { useEffect, useState } from "react";
import { Skeleton } from "@nextui-org/react";
import { getFB } from "../../Components/Global/functions/firebase";
import ListBox from "../../Components/Common/ListBox";
import Dialog from "../../Components/Common/Dialog";
import { Button } from "@nextui-org/react";

export const RecentNestsList = () => {
  const [nestsdb, setNestsdb] = useState({ nests: [], loading: false });
  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    body: "",
    footer: "",
  });

  function displayPartsList(value, nest) {
    const body = (
      <div>
        <p>Created On: {nest.addedon}</p>
        {value.map((parts) => (
          <p>{parts.name}</p>
        ))}
      </div>
    );
    const footer = (
      <Button
        color="danger"
        variant="light"
        onPress={() => handleDialogClose()}>
        Close
      </Button>
    );
    setDialog({
      open: true,
      title: "Parts List: " + nest.nestName,
      body: body,
      footer: footer,
    });
  }

  function handleDialogClose() {
    setDialog({ ...dialog, open: false });
  }

  useEffect(() => {
    setNestsdb({ ...nestsdb, loading: true });
    const fetchData = async () => {
      const nests = await getFB("/nests");

      if (Array.isArray(nests)) {
        setNestsdb({ ...nests, loading: false, nests: nests });
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        {nestsdb.loading ? (
          <Skeleton className="rounded-lg">
            <div style={{ height: "500px" }}></div>
          </Skeleton>
        ) : (
          <div style={{ height: "500px" }}>
            {nestsdb.nests
              .slice()
              .sort((b, a) => new Date(a.addedon) - new Date(b.addedon))
              .map((value) => (
                <ListBox
                  title={value.nestName}
                  edge={value.parts.length}
                  icon={"not"}
                  clickEvent={() => displayPartsList(value.parts, value)}
                />
              ))}
          </div>
        )}
      </div>
      <div>
        <Dialog
          open={dialog.open}
          title={dialog.title}
          body={dialog.body}
          footer={dialog.footer}
        />
      </div>
    </div>
  );
};
