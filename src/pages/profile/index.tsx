'use client'

import { FlexDiv } from "@/components/div";
import MiningStatus from "@/components/miningStatus";
import { P } from "@/components/p";
import Image from "next/image";

import conetAnonymousIcon from '@/assets/conet-anonymous-icon.svg'
import { useEffect, useState } from "react";
import { useGameContext } from "@/utilitiy/providers/GameProvider";
import BackButton from "@/components/backButton";
import { formatToken } from "@/utilitiy/functions";
import PageWrapper from "@/components/pageWrapper";
import Skeleton from "react-loading-skeleton";
import { Img } from "@/utilitiy/images";
import { Button } from "@/components/button";
import { saveGameProfileInfo } from "@/API";
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";

export default function Profile() {
    const { t } = useTranslation();
    const { highScore } = useGameContext();
    const [username, setUsername] = useState<string>('')
    const [bio, setBio] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const { profile } = useGameContext();

    useEffect(() => {
        if (profile && !isEditing) {
            setUsername(profile?.game?.username);
            setBio(profile?.game?.bio);
        }
    }, [profile]);

    const handleBioChange = (e: any) => {
        const newBio = e.target.value;

        if (newBio.length > 140) {
            setError(t("components.profile.error.characterLimitExceeded"));
        } else {
            setError('');
        }

        setBio(newBio.slice(0, 140));
    };

    const handleUsernameChange = (e: any) => {
        setUsername(e.target.value);
    };

    const handleSaveChanges = () => {
        setIsEditing(false);

        saveGameProfileInfo(profile?.keyID, {
            nickname: username,
            bio: bio,
        });

        setUsername(username);
        setBio(bio);

        toast.success(t("components.profile.toast.profileSavedSuccessfully"), {
            position: "bottom-center",
            duration: 2000,
        });
    };

    return (
        <PageWrapper margin="12px 16px 140px 16px">
            <FlexDiv $direction="column" $gap="32px">
                <FlexDiv $align="center" $justify="space-between">
                    <BackButton text={t("components.profile.backButton.myProfile")} to="/" />

                    {isEditing ? (
                        <Button
                            $radius="8px"
                            $background="#363E59"
                            $padding="8px 32px"
                            $fontSize="16px"
                            onClick={handleSaveChanges}
                        >
                            {t("components.profile.button.saveChanges")}
                        </Button>
                    ) : (
                        <Button
                            $width="32px"
                            $height="32px"
                            $background="#474648"
                            $radius="50%"
                            onClick={() => setIsEditing(true)}
                        >
                            <Image
                                width={16}
                                height={16}
                                src={Img.EditIcon}
                                alt={t("components.profile.alt.editIcon")}
                            />
                        </Button>
                    )}
                </FlexDiv>

                <FlexDiv $justify="space-between" $align="flex-start" $width="100%">
                    <Image
                        src={conetAnonymousIcon}
                        height={120}
                        width={120}
                        alt={t("components.profile.alt.profileLogo")}
                    />

                    <FlexDiv $direction="column" $justify="space-between">
                        <input
                            placeholder={t("components.profile.placeholder.anonymousUser")}
                            disabled={!isEditing}
                            value={username}
                            onChange={handleUsernameChange}
                            style={{
                                color: '#FFFFFF',
                                backgroundColor: isEditing ? '#63636366' : 'transparent',
                                border: '1px solid #FFFFFF1A',
                                borderRadius: '16px',
                                height: '56px',
                                padding: '12px 14px',
                                marginBottom: '28px',
                            }}
                        />

                        <FlexDiv>
                            <FlexDiv
                                $direction="column"
                                $padding="0 12px"
                                style={{
                                    borderRight: '1px solid',
                                    borderImageSource: 'linear-gradient(to bottom, rgba(121, 248, 255, 0) 0.47%, #79F8FF 50.82%, #D775FF 76%, rgba(215, 117, 255, 0) 101.18%)',
                                    borderImageSlice: 1,
                                    borderWidth: '0 1px 0 0',
                                }}
                            >
                                <P $color="#929092" $fontSize="12px" style={{ lineHeight: '28px' }}>
                                    {t("components.profile.profile.highestScore")}
                                </P>

                                <P $fontSize="20px">{highScore}</P>
                            </FlexDiv>

                            <FlexDiv $direction="column" $padding="0 16px">
                                <P $color="#929092" $fontSize="12px" style={{ lineHeight: '28px' }}>
                                    {t("components.profile.profile.worldRanking")}
                                </P>
                                <P $fontSize="20px">&infin;</P>
                            </FlexDiv>
                        </FlexDiv>
                    </FlexDiv>
                </FlexDiv>

                <FlexDiv $direction="column">
                    <P $fontSize="24px" style={{ marginBottom: '16px', lineHeight: '32px', letterSpacing: '0.1px' }}>
                        {t("components.profile.profile.myBio")}
                    </P>

                    <textarea
                        disabled={!isEditing}
                        placeholder={t("components.profile.placeholder.bioPlaceholder")}
                        value={bio}
                        onChange={handleBioChange}
                        style={{
                            color: '#FFFFFF',
                            backgroundColor: isEditing ? '#63636366' : 'transparent',
                            border: '1px solid #FFFFFF1A',
                            borderRadius: '16px',
                            height: '160px',
                            padding: '14px',
                            width: '100%',
                            resize: 'none',
                            overflowWrap: 'break-word',
                            whiteSpace: 'pre-wrap',
                        }}
                    />

                    {error && (
                        <P $color="#FFDAD6" $fontSize="10px" style={{ lineHeight: '12px' }}>
                            {error}
                        </P>
                    )}
                </FlexDiv>

                <FlexDiv $direction="column" $gap="16px">
                    <P $fontSize="24px" style={{ lineHeight: '32px', letterSpacing: '0.1px' }}>
                        {t("components.profile.profile.myAchievements")}
                    </P>

                    {profile ? (
                        <FlexDiv $direction="row" $gap="8px">
                            <P $fontSize="20px" style={{ lineHeight: '16px' }}>
                                {formatToken(profile?.tokens?.cCNTP?.balance)}
                            </P>
                            <P $fontSize="12px" style={{ lineHeight: '16px' }}>
                                {t("components.profile.profile.cntpEarned")}
                            </P>
                        </FlexDiv>
                    ) : (
                        <Skeleton width={200} />
                    )}
                </FlexDiv>
            </FlexDiv>
        </PageWrapper>
    );
}
