import React from "react";
import Container from "./components/Container";
import Search from "./components/search/Search";
import NavTabs from "./components/navtabs/NavTabs";
import PhotographsSection from "./components/sections/photographs_section/index";
import ContributorSection from "./components/sections/contributor/index"

import ProcessTableSection from "./components/sections/process_table_section/index"
import DebtsSection from "./components/sections/debts_sections/index"
import PaymentsSections from "./components/sections/payments_sections/index";

function AccountHistoryModule() {
  const [selectedTab, setSelectedTab] = React.useState("Contributor" /* "FormularioDatosFaltantes" */);

  const handleTabChange = (event, newTab) => {
    setSelectedTab(newTab);
  };

  const renderContent = (selectedValue) => {
    // const name = options[selectedValue];
    switch (selectedValue) {
      /* case "MissingDataForm":
        return <MissingDataSection {...missingData} />; */
      case "Contributor":
        return (
          <>
            <ContributorSection
            /*   contributor={contributor}
              address={address}
              role={role} */
            />
         
          </>
        );
     
      case "Payments":
        return <PaymentsSections /* payments={payments} */ />;
      case "Debt":
        return <DebtsSection /* debts={debts} */ />;
      case "PerformedActions":
        return <ProcessTableSection /* actions={actions} */ />;
      case "CapturedPhotographs":
        return <PhotographsSection /* photos={photos} */ />;

      default:
        return null;
    }
  };
  return (
    <>
      <Container>
        <Search />
      </Container>
      <Container>
        <NavTabs value={selectedTab} handleChange={handleTabChange} />
      </Container>
      <Container>{renderContent(selectedTab)}</Container>
    </>
  );
}

export default AccountHistoryModule;
