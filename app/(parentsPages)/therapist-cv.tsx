import React from 'react';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import { BackButton } from '../../components/BackButton';
import ContactInfoButton from '../../components/ContactInfoButton';
import AddressBox from '../../components/AddressBox';
import ExperienceList from '../../components/ExperienceList';
import { IMAGES } from '@/constants/images';
import { router } from 'expo-router';

interface TherapistCVProps {
	name: string;
	description: string;
	phone: string;
	email: string;
	experiences: Array<{ title: string; years: string; description: string }>;
	address: string;
	image: any;
}

export default function TherapistCV({
	name = 'Rodrigo Vega',
	description = 'Soy Rodrigo, un psicólogo apasionado por los niños y su salud emocional en ellos',
	phone = '4436459525',
	email = 'hola@gmail.com',
	experiences = [
		{
			title: 'DIF Maravatio',
			years: '2025-2030',
			description: 'Consultas, programa de salud emociona, etc.',
		},
		{
			title: 'DIF Maravatio',
			years: '2025-2030',
			description: 'Consultas, programa de salud emociona, etc.',
		},
		{
			title: 'DIF Maravatio',
			years: '2025-2030',
			description: 'Consultas, programa de salud emociona, etc.',
		},
	]
		,
	address = 'Col. husbx calle bz #221, morelia, mich',
	image = IMAGES.THERAPIST_PHOTO_CV,
}: TherapistCVProps) {
	const { width, height } = Dimensions.get('window');
	const isTablet = width >= 520;
	const dynamicHeight = isTablet ? height * 0.5 : height * 0.4;
	const fontSize = width * 0.08;
	const bgColor = 'bg-pink-300';

	return (
		<View className="flex-1 bg-white">
			<ScrollView
				showsVerticalScrollIndicator={false}
			>
				<View
					className={`relative ${bgColor}`}
					style={{ height: dynamicHeight }}
				>
					<View className="absolute top-16 left-4 z-20">
						<BackButton onPress={() => router.back()} />
					</View>
					<View className="flex-1 justify-end items-center">
						<Image
							source={image}
							className="w-80 h-80 mb-[-30px]"
							resizeMode="contain"
						/>
						<View
							className="bg-white rounded-3xl py-3 mb-[-30px] px-5 z-20 shadow-md items-center justify-center"
							style={{ width: width * 0.7 }}
						>
							<Text
								className="text-center font-UrbanistBold text-black"
								style={{ fontSize: 28, lineHeight: 32, flexWrap: 'wrap', maxWidth: '100%' }}
								numberOfLines={3}
								ellipsizeMode="tail"
							>
								{name}
							</Text>
						</View>
					</View>
				</View>
				<View className="bg-white rounded-t-3xl px-6 pt-6 pb-6 shadow-sm">
					<Text
						className="text-gray-800 text-lg text-center mt-6 mb-2 font-normal"
						style={{ flexWrap: 'wrap', maxWidth: '100%' }}
						numberOfLines={6}
						ellipsizeMode="tail"
					>
						{description}
					</Text>
					<Text className="text-orange-500 font-bold text-2xl mt-6 mb-2 text-center">
						Contáctame
					</Text>
					<View
						className="flex-row flex-wrap justify-center w-full mb-2"
						style={{ columnGap: 10, rowGap: 8 }}
					>
						<ContactInfoButton label={phone} />
						<ContactInfoButton label={email} />
					</View>
					<Text className="text-orange-500 font-bold text-2xl mt-6 mb-2 text-center">
						Experiencia
					</Text>
					<ExperienceList experiences={experiences} />
					<Text className="text-orange-500 font-bold text-2xl mt-6 mb-1 text-center">
						Encuéntrame
					</Text>
					<View style={{ marginBottom: 32 }}>
						<AddressBox address={address} />
					</View>
				</View>
			</ScrollView>
		</View>
	);
}