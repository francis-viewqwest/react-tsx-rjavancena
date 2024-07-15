import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import _ from "lodash";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  getRegions,
  getProvinces,
  getMunicipality,
  getBarangay,
} from "@/app/slice/userSlice";

const Welcome: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [fadeLeft, setFadeLeft] = useState(true);
  const [formSetIn, setFormSetIn] = useState(true);
  const dispatch = useAppDispatch();
  const regionsData = useAppSelector((state) => state.user.getRegions);
  const provincesData = useAppSelector((state) => state.user.getProvinces);
  const municipalityData = useAppSelector(
    (state) => state.user.getMunicipality
  );
  const brgyData = useAppSelector((state) => state.user.getBarangay);

  console.log(municipalityData);
  console.log(brgyData);

  const [progress, setProgress] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
    setError,
  } = useForm();

  const inputFields = [
    { label: "Profile", type: "file", section: "profile" },
    { label: "Email", type: "email", section: "profile" },
    { label: "First name", type: "text", section: "profile" },
    { label: "Last name", type: "text", section: "profile" },
    { label: "Contact number", type: "number", section: "profile" },
    { label: "Region", type: "select", section: "address" },
    { label: "Province", type: "select", section: "address" },
    { label: "City/Municipalities", type: "select", section: "address" },
    { label: "Barangay", type: "select", section: "address" },
    { label: "Address 1", type: "text", section: "address" },
    { label: "Address 2", type: "text", section: "address" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeLeft(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFormSetIn(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    dispatch(
      getRegions({
        url: "https://psgc.gitlab.io/api/regions/",
        method: "GET",
      })
    );
  }, []);

  const formValues = watch();
  const { region, province, city_municipalities } = formValues;

  useEffect(() => {
    if (region) {
      dispatch(
        getProvinces({
          url: `https://psgc.gitlab.io/api/regions/${region}/provinces/`,
          method: "GET",
        })
      );
    }
  }, [region]);

  useEffect(() => {
    if (province) {
      dispatch(
        getMunicipality({
          url: `https://psgc.gitlab.io/api/provinces/${province}/cities-municipalities/`,
          method: "GET",
        })
      );
    }
  }, [province]);

  useEffect(() => {
    if (city_municipalities) {
      dispatch(
        getBarangay({
          url: `https://psgc.gitlab.io/api/cities-municipalities/${city_municipalities}/barangays/`,
          method: "GET",
        })
      );
    }
  }, [city_municipalities]);

  useEffect(() => {
    const completedFields = Object.values(formValues).filter(
      (value) => value
    ).length;

    const totalFields = inputFields.length;

    setProgress((completedFields / totalFields) * 100);
  }, [formValues]);

  return (
    <>
      <div className="w-full h-auto bg-neutral-200">
        {formSetIn && (
          <div className="flex flex-col items-center h-screen justify-center gap-3">
            <AnimatePresence>
              {isVisible && (
                <>
                  <motion.h1
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.3,
                      ease: "easeInOut",
                      duration: 1.2,
                    }}
                    exit={{
                      opacity: 0,
                      transition: { delay: 2, duration: 1.2 },
                    }}
                    className="font-black text-2xl sm:text-5xl"
                  >
                    Welcome to RJ AVANCENA
                  </motion.h1>
                </>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {fadeLeft && (
                <>
                  <motion.p
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.9,
                      ease: "easeInOut",
                      duration: 1.2,
                    }}
                    exit={{
                      opacity: 0,
                      x: -100,
                      transition: { duration: 1 },
                    }}
                    className="text-neutral-400 sm:text-lg"
                  >
                    Your Personalized Dashboard Awaits
                  </motion.p>
                </>
              )}
            </AnimatePresence>
          </div>
        )}
        {!formSetIn && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                ease: "easeInOut",
                duration: 1.2,
              }}
              className={`mx-auto px-4 lg:px-10 py-40  `}
            >
              <div className="flex flex-col gap-3 pb-10">
                <h1 className="text-2xl font-bold">Lets get you started!</h1>
                <p className="text-sm text-neutral-500 w-[56rem]">
                  Welcome to RJ AVANCENA, where we aim to provide you with a
                  seamless and personalized experience. Below is your profile
                  information. Feel free to review and update any details as
                  necessary.
                </p>
              </div>
              <div className="bg-white rounded-lg w-full h-full border-2 py-5 border-neutral-300">
                <h1 className="font-medium px-6 mb-4 flex items-center gap-3">
                  Complete your profile{" "}
                  {progress === 100 && <IconCircleCheckFilled color="green" />}
                </h1>
                <Progress className="rounded-none h-[3px]" value={progress} />
                <div className="px-6">
                  {/* Profile Information */}
                  <div className="pt-10">
                    <h1 className="text-sm font-bold">Profile Information</h1>
                    <div className="pt-6 gap-6 lg:grid lg:grid-cols-2">
                      <div className="grid gap-5 lg:grid-cols-2">
                        {inputFields
                          .filter((field) => field.section === "profile")
                          .map((field, index) => (
                            <div
                              key={index}
                              className="grid w-full max-w-sm items-center gap-1.5"
                            >
                              <Label
                                className="text-neutral-600"
                                htmlFor={field.label}
                              >
                                {field.label}
                              </Label>
                              <Input
                                id={field.label}
                                type={field.type}
                                {...register(
                                  field.label.replace(/\s+/g, "_").toLowerCase()
                                )}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="pt-10">
                    <h1 className="text-sm font-bold">Address Information</h1>
                    <div className="pt-6 gap-6 lg:grid lg:grid-cols-2">
                      <div className="grid gap-5 lg:grid-cols-2">
                        {inputFields
                          .filter((field) => field?.section === "address")
                          .map((field, index) => (
                            <div
                              key={index}
                              className="grid w-full max-w-sm items-center gap-1.5"
                            >
                              <Label
                                className="text-neutral-600"
                                htmlFor={field.label}
                              >
                                {field.label}
                              </Label>
                              {field.type === "select" &&
                                field.label === "Region" && (
                                  <Select
                                    onValueChange={(value) =>
                                      setValue(
                                        field.label
                                          .replace(/\s+/g, "_")
                                          .toLowerCase(),
                                        value
                                      )
                                    }
                                    value={watch(
                                      field.label
                                        .replace(/\s+/g, "_")
                                        .toLowerCase()
                                    )}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a region" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Region</SelectLabel>
                                        {Array.isArray(regionsData) &&
                                          regionsData.map((region: any) => (
                                            <SelectItem
                                              key={region.code}
                                              value={region.code}
                                            >
                                              {region.regionName}
                                            </SelectItem>
                                          ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                )}

                              {field.type === "select" &&
                                field.label === "Province" && (
                                  <Select
                                    onValueChange={(value) =>
                                      setValue(
                                        field.label
                                          .replace(/\s+/g, "_")
                                          .toLowerCase(),
                                        value
                                      )
                                    }
                                    value={watch(
                                      field.label
                                        .replace(/\s+/g, "_")
                                        .toLowerCase()
                                    )}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a province" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Region</SelectLabel>
                                        {Array.isArray(provincesData) &&
                                          provincesData.map((prov: any) => (
                                            <SelectItem
                                              key={prov.code}
                                              value={prov.code}
                                            >
                                              {prov.name}
                                            </SelectItem>
                                          ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                )}

                              {field.type === "select" &&
                                field.label === "City/Municipalities" && (
                                  <Select
                                    onValueChange={(value) =>
                                      setValue(
                                        field.label
                                          .replace(/\//g, "_")
                                          .toLowerCase(),
                                        value
                                      )
                                    }
                                    value={watch(
                                      field.label
                                        .replace(/\//g, "_")
                                        .toLowerCase()
                                    )}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a City/Municipalities" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>
                                          City/Municipalities
                                        </SelectLabel>
                                        {Array.isArray(municipalityData) &&
                                          municipalityData.map((prov: any) => (
                                            <SelectItem
                                              key={prov.code}
                                              value={prov.code}
                                            >
                                              {prov.name}
                                            </SelectItem>
                                          ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                )}

                              {field.type === "select" &&
                                field.label === "Barangay" && (
                                  <Select
                                    onValueChange={(value) =>
                                      setValue(
                                        field.label
                                          .replace(/\s+/g, "_")
                                          .toLowerCase(),
                                        value
                                      )
                                    }
                                    value={watch(
                                      field.label
                                        .replace(/\s+/g, "_")
                                        .toLowerCase()
                                    )}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a barangay" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectLabel>Barangay</SelectLabel>
                                        {Array.isArray(brgyData) &&
                                          brgyData.map((prov: any) => (
                                            <SelectItem
                                              key={prov.name}
                                              value={prov.name}
                                            >
                                              {prov.name}
                                            </SelectItem>
                                          ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                )}

                              {field.type !== "select" && (
                                <Input
                                  id={field.label}
                                  type={field.type}
                                  {...register(
                                    field.label
                                      .replace(/\s+/g, "_")
                                      .toLowerCase()
                                  )}
                                />
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-10">
                    <Button
                      disabled={progress !== 100}
                      className="bg-bgrjavancena"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </>
  );
};

export default Welcome;
