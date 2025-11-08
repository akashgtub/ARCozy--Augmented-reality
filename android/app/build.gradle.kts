plugins {
    id("com.android.application")
    // Firebase & Google services (if you use Firebase)
    id("com.google.gms.google-services")
    id("kotlin-android")
    // Flutter plugin must come last
    id("dev.flutter.flutter-gradle-plugin")
}

android {
    namespace = "com.example.aaaarcozy"
    compileSdk = flutter.compileSdkVersion
    ndkVersion = flutter.ndkVersion

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }

    kotlinOptions {
        jvmTarget = JavaVersion.VERSION_11.toString()
    }

    defaultConfig {
        applicationId = "com.example.aaaarcozy"

        // ✅ Required for Jitsi SDK 11.6.0+
        minSdk = 26
        targetSdk = flutter.targetSdkVersion

        versionCode = flutter.versionCode
        versionName = flutter.versionName
    }

    buildTypes {
        release {
            // TODO: Replace with your release signing config later
            signingConfig = signingConfigs.getByName("debug")
        }
    }

    // Optional but recommended: prevents manifest merge issues
    lint {
        abortOnError = false
    }
}

flutter {
    source = "../.."
}

dependencies {
    // Firebase (optional)
    implementation(platform("com.google.firebase:firebase-bom:33.3.0"))
    implementation("com.google.firebase:firebase-analytics")

    // ✅ Jitsi Meet SDK (handled via plugin dependency)
    // No need to add manually; it’s pulled from jitsi_meet_flutter_sdk 11.6.0
}
