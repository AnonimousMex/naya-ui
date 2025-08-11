import React from 'react';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import { BackButton } from '../../components/BackButton';
import ContactInfoButton from '../../components/ContactInfoButton';
import AddressBox from '../../components/AddressBox';
import ExperienceList from '../../components/ExperienceList';
import SpecialtyList from '../../components/SpecialtyList';
import { IMAGES } from '@/constants/images';
import { router, useLocalSearchParams } from 'expo-router';

export default function TherapistCV() {
	const params = useLocalSearchParams();
	
	const name = params.name as string || 'Sin nombre registrado';
	const description = params.description as string || 'No hay descripción disponible';
	const phone = params.phone as string || 'No hay teléfono registrado';
	const email = params.email as string || 'No hay email registrado';
	const address = params.address as string || 'No hay dirección registrada';
	
	let specialties;
	try {
		specialties = params.specialties ? JSON.parse(params.specialties as string) : [];
	} catch (error) {
		specialties = [];
	}
	
	if (specialties.length === 0) {
		specialties = [
			{
				name: 'No hay especialidades registradas',
				description: ''
			}
		];
	}
	
	let experiences;
	try {
		experiences = params.experiences ? JSON.parse(params.experiences as string) : [];
	} catch (error) {
		experiences = [];
	}
	
	if (experiences.length === 0) {
		experiences = [
			{
				title: 'No hay experiencias registradas',
				years: '',
				description: 'No se han registrado experiencias profesionales',
			}
		];
	}
	
	const imageKey = params.image as string || 'THERAPIST_PHOTO_CV';
	const image = IMAGES[imageKey as keyof typeof IMAGES] || IMAGES.THERAPIST_PHOTO_CV;

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
						Especialidades
					</Text>
					<SpecialtyList specialties={specialties} />
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