import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, TextField, Typography } from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const CONFIG = {
  ITEM_COUNT: 200000,
};

const generateArrayFromLength = (length: number): number[] =>
  Array.from({ length }, (_, i) => i + 1);

const PAGE_SIZE = 20;

const InfinteAccordin = () => {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState<number[]>([]);

  const lastObserver = useRef<IntersectionObserver>(null);
  const firstObserver = useRef<IntersectionObserver>(null);

  const totalItems = useMemo(() => {
    return generateArrayFromLength(CONFIG.ITEM_COUNT);
  }, []);

  const totalPages = useMemo(() => {
    return Math.ceil(totalItems.length / PAGE_SIZE);
  }, [totalItems]);

  const lastItemRef = useCallback(
    (node: HTMLDivElement) => {
      if (lastObserver.current) lastObserver.current.disconnect();
      lastObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const nextPage = page + 1;
          if (nextPage > totalPages) return;
          setPage(nextPage);
        }
      });

      if (node) lastObserver.current.observe(node);
    },
    [page, totalPages]
  );

  const firstItemRef = useCallback(
    (node: HTMLDivElement) => {
      if (firstObserver.current) firstObserver.current.disconnect();
      firstObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          const nextPage = page - 1;
          if (page <= 0) return;
          setPage(nextPage);
        }
      });

      if (node) firstObserver.current.observe(node);
    },
    [page]
  );

  useEffect(() => {
    const startIndex = Math.max(page * PAGE_SIZE - PAGE_SIZE - 1, 0);
    const endIndex = page * PAGE_SIZE + PAGE_SIZE - 1;
    console.log({ page, startIndex, endIndex });
    setItems(totalItems.slice(startIndex, endIndex));
  }, [page, totalItems]);


  const DividerStyle = {
    width: {
      xs: "100%",
      sm: "auto",
    },
    height: {
      xs: "1px",
      sm: "auto",
    },
    borderRightWidth: {
      xs: 0,
      sm: 1,
    },
    borderBottomWidth: {
      xs: 1,
      sm: 0,
    },
  };
  
  const GridStyle = {
    display: "grid",
    gridTemplateColumns: {
      xs: `repeat(auto-fit, minmax(${("200px")}, 1fr))`,
      sm: "repeat(1, 1fr)",
    },
    gap: "24px",
  };

  return (
    <>
      <p>Rendering - {totalItems.length} items </p>
      {items.map((item, index) => {
        const isFirstElem = index === 0;
        const isLastElem = items.length === index + 1;
        // return (
        //   <div
        //     style={{ padding :"2rem",width:"100%" ,backgroundColor:"pink",border:'1px solid black'}}
        //     key={item}
        //     id={`${item}`}
        //     ref={isFirstElem ? firstItemRef : isLastElem ? lastItemRef : null}
        //   >
        //     item - {item}
        //   </div>
        // );
        return (
          <Accordion
            key={item}
            id={`${item}`}
            ref={isFirstElem ? firstItemRef : isLastElem ? lastItemRef : null}
          >
            <AccordionSummary aria-controls="panel1-content" id="panel1-header">
              Job Profile Name
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                  gap: {
                    xlg: "32px",
                    lg: "24px",
                    sm: "16px",
                    xs: "32px",
                  },
                }}
              >
                <Box sx={{ minWidth: 0, flexBasis: "100%" }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ marginBottom: "16px" }}
                  >
                    From PW
                  </Typography>
                  <Box sx={GridStyle}>
                    {/* <Field label="Job Title" value="Job Title" />
                    <Field label="Job description" value="Job description" />
                    <Field label="Skills" value="Skills" />
                    <Field label="Education" value="Education" />
                    <Field
                      label="Areas of interest"
                      value="Areas of interest"
                    />
                    <Field label="Tasks" value="Tasks" />
                    <Field label="Abilities" value="Abilities" />
                    <Field label="Work activities" value="Work activities" /> */}
                    <Typography>Skill</Typography>
                    <Typography>Value</Typography>
                    <Typography>Skill</Typography>
                      <Typography>Value</Typography>
                      <Typography>Skill</Typography>
                      <Typography>Value</Typography>
                      <Typography>Skill</Typography>
                      <Typography>Value</Typography>
                      <Typography>Skill</Typography>
                      <Typography>Value</Typography>
                      <Typography>Skill</Typography>
                      <Typography>Value</Typography>
                      <Typography>Skill</Typography>
                      <Typography>Value</Typography>
                      <Typography>Skill</Typography>
                      <Typography>Value</Typography>
                  </Box>
                </Box>
                <Divider orientation="vertical" flexItem sx={DividerStyle} />
                <Box sx={{ minWidth: 0, flexBasis: "100%" }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ marginBottom: "16px" }}
                  >
                    From User
                  </Typography>
                  <Box sx={GridStyle}>
                    <Box>
                      <TextField
                        id="outlined-basic"
                        label="Job Title"
                        variant="outlined"
                        placeholder="Job Title"
                        fullWidth
                        required
                      />
                    </Box>
                    <Box>
                      <TextField
                        id="outlined-basic"
                        label="Job description"
                        variant="outlined"
                        placeholder="Job description"
                        fullWidth
                        required
                      />
                    </Box>
                    <Box>
                      {/* <Field label="Skills" value="Skills" required /> */}
                      <Typography>Skill</Typography>
                      <Typography>Value</Typography>
                    </Box>
                    <Box>
                      {/* <Field label="Education" value="Education" required /> */}
                      <Typography>Skill</Typography>
                      <Typography>Value</Typography>
                    </Box>
                    <Box>
                      {/* <Field
                        label="Areas of interest"
                        value="Marketing & Advertising"
                        required
                      /> */}
                      <Typography>Skill</Typography>
                      <Typography>Value</Typography>
                    </Box>
                    <Box>
                      <TextField
                        id="outlined-basic"
                        label="Tasks"
                        variant="outlined"
                        placeholder="Tasks"
                        helperText="Type and press Enter to add Tasks"
                        fullWidth
                        required
                      />
                    </Box>
                    <Box>
                      <TextField
                        id="outlined-basic"
                        label="Abilities"
                        variant="outlined"
                        placeholder="Work activities"
                        helperText="Type and press Enter to add Abilities"
                        fullWidth
                        required
                      />
                    </Box>
                    <Box>
                      <TextField
                        id="outlined-basic"
                        label="Work activities"
                        variant="outlined"
                        placeholder="Work activities"
                        helperText="Type and press Enter to add Work Activities"
                        fullWidth
                        required
                      />
                    </Box>
                  </Box>
                </Box>
                <Divider orientation="vertical" flexItem sx={DividerStyle} />
                <Box sx={{ minWidth: 0, flexBasis: "100%" }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ marginBottom: "16px" }}
                  >
                    Compare with other jobs
                  </Typography>

                  {/* <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    disableClearable
                    value={searchInput}
                    onChange={(_event, newValue) => {
                      setSearchInput(newValue ?? "");
                    }}
                    options={top100Films.map((option) => option.title)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Search"
                        placeholder="Search"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <>
                              {searchInput === "" && (
                                <InputAdornment position="end">
                                  <SearchIcon />
                                </InputAdornment>
                              )}
                              {searchInput !== "" && (
                                <InputAdornment
                                  position="end"
                                  onClick={handleReset}
                                >
                                  <ClearIcon />
                                </InputAdornment>
                              )}
                            </>
                          ),
                        }}
                      />
                    )}
                  /> */}
                </Box>
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: `repeat(auto-fit, minmax(${"200px"}}, 1fr))`,
                    sm: "repeat(3, 1fr)",
                  },
                  gap: {
                    xlg: "64px",
                    md: "24px",
                    sm: "16px",
                    xs: "24px",
                  },
                  marginTop: "40px",
                }}
              >
                <Box sx={{ minWidth: 0, flexBasis: "100%" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="medium"
                  >
                    Accept
                  </Button>
                </Box>
                <Box
                  sx={{
                    minWidth: 0,
                    flexBasis: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    size="medium"
                  >
                    Merge With PW System Data
                  </Button>
                  <Box>
                  <Typography>Skill</Typography>
                  <Typography>Value</Typography>
                    {/* <Field label="Job Title" value="[Value goes here]" /> */}
                  </Box>
                </Box>
                <Box sx={{ minWidth: 0, flexBasis: "100%" }}>
                  <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    size="medium"
                    // onClick={rejectModalOpen}
                  >
                    Reject
                  </Button>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};

export default InfinteAccordin;
